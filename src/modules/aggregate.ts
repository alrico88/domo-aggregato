/* eslint-disable no-restricted-syntax */
import is from '@sindresorhus/is';
import { Except } from 'type-fest';
import { inRange, Operations, performOperation } from '../helpers/operations';
import { getStringBucketName } from '../helpers/strings';
import { AggregationResult } from '../models/AggregationResult';
import { BucketResult } from '../models/BucketResult';
import { NumberBucket } from '../models/CountResult';
import { IntermediateAggregationResult } from '../models/IntermediateAggregationResult';
import { Iteratee, getAccessor } from './accesor';

export interface AggregationOptions<T> {
  keyGetter: Iteratee<T, string>,
  valueGetter: Iteratee<T, number>,
  eventsGetter?: Iteratee<T, number>
  operation: Operations,
}

function performAggregation(
  intermediateResult: IntermediateAggregationResult,
  operation: Operations,
): AggregationResult {
  const aggResult = new AggregationResult();

  // Process results
  Object.entries(intermediateResult.results).forEach(([bucketName, values]) => {
    aggResult.results[bucketName] = performOperation(values, operation);
  });

  // Process rest
  aggResult.rest = performOperation(intermediateResult.rest, operation);

  return aggResult;
}

/**
 * Performs an aggregation operation using string-based buckets
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {string[][]} buckets
 * @param {AggregationOptions<T>} aggregationOptions
 * @return {AggregationResult}
 */
export function aggregateByStringBuckets<T>(
  array: T[],
  buckets: string[][],
  aggregationOptions: AggregationOptions<T>,
): AggregationResult {
  const keyAccessor = getAccessor(aggregationOptions.keyGetter);
  const valueAccessor = getAccessor(aggregationOptions.valueGetter);
  const eventsAccessor = is.undefined(aggregationOptions.eventsGetter)
    ? () => 1
    : getAccessor(aggregationOptions.eventsGetter);

  const initializer = new IntermediateAggregationResult();

  buckets.forEach((bucket) => {
    const bucketName = getStringBucketName(bucket);

    initializer.results[bucketName] = [];
  });

  const intermediateResult = array.reduce((agg, item) => {
    const itemKey = keyAccessor(item);
    const itemVal = valueAccessor(item);
    const itemEvents = eventsAccessor(item);
    const toPush = new BucketResult(itemVal, itemEvents);

    let hasBucket = false;

    for (const bucket of buckets) {
      const bucketName = getStringBucketName(bucket);

      if (bucket.includes(itemKey)) {
        agg.results[bucketName].push(toPush);
        hasBucket = true;

        break;
      }
    }

    if (!hasBucket) {
      agg.rest.push(toPush);
    }

    return agg;
  }, initializer);

  return performAggregation(intermediateResult, aggregationOptions.operation);
}

/**
 * Performs an aggregation operation using number-based buckets
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {NumberBucket[]} buckets
 * @param {Except<AggregationOptions<T>, 'keyGetter'>} aggregationOptions
 * @return {*}  {AggregationResult}
 */
export function aggregateByNumberBuckets<T>(
  array: T[],
  buckets: NumberBucket[],
  aggregationOptions: Except<AggregationOptions<T>, 'keyGetter'>,
): AggregationResult {
  const valueAccessor = getAccessor(aggregationOptions.valueGetter);
  const eventsAccessor = is.undefined(aggregationOptions.eventsGetter)
    ? () => 1
    : getAccessor(aggregationOptions.eventsGetter);

  const initializer = new IntermediateAggregationResult();

  buckets.forEach((bucket) => {
    initializer.results[bucket.id] = [];
  });

  const intermediateResult = array.reduce((agg, item) => {
    const itemVal = valueAccessor(item);
    const itemEvents = eventsAccessor(item);
    const toPush = new BucketResult(itemVal, itemEvents);

    let hasBucket = false;

    for (const bucket of buckets) {
      if (inRange(itemVal, bucket.from, bucket.to)) {
        agg.results[bucket.id].push(toPush);
        hasBucket = true;

        break;
      }
    }

    if (!hasBucket) {
      agg.rest.push(toPush);
    }

    return agg;
  }, initializer);

  return performAggregation(intermediateResult, aggregationOptions.operation);
}
