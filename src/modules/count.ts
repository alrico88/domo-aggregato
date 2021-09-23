/* eslint-disable no-restricted-syntax */
import get from 'lodash/get';
import { inRange } from '../helpers/operations';
import { getStringBucketName } from '../helpers/strings';
import { NumberBucket, CountResult } from '../models/CountResult';
import { getAccessor, Iteratee } from './accesor';

/**
 * Count the amount of times a certain string or chain of strings appear in a collection
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {string[][]} buckets
 * @param {Iteratee<T, string>} iteratee
 * @return {CountResult}
 */
export function countByStringBuckets<T>(
  array: T[],
  buckets: string[][],
  iteratee: Iteratee<T, string>,
): CountResult {
  const accessor = getAccessor(iteratee);

  const initializer = new CountResult();

  buckets.forEach((bucket) => {
    const bucketName = getStringBucketName(bucket);

    initializer.result[bucketName] = 0;
  });

  return array.reduce((agg, item) => {
    const itemVal = accessor(item);

    let hasBucket = false;

    for (const bucket of buckets) {
      if (bucket.includes(itemVal)) {
        const bucketName = getStringBucketName(bucket);
        agg.result[bucketName] = get(agg.result, bucketName, 0) + 1;
        hasBucket = true;
        break;
      }
    }

    if (!hasBucket) {
      agg.rest += 1;
    }

    return agg;
  }, initializer);
}

/**
 * Count the amount of items inside a number bucket in a collection
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {NumberBucket[]} buckets
 * @param {Iteratee<T, number>} iteratee
 * @return {CountResult}
 */
export function countByNumberBuckets<T>(
  array: T[],
  buckets: NumberBucket[],
  iteratee: Iteratee<T, number>,
): CountResult {
  const accessor = getAccessor(iteratee);

  const initializer = new CountResult();

  buckets.forEach(({ id }) => {
    initializer.result[id] = 0;
  });

  return array.reduce((agg, item) => {
    const itemVal = accessor(item);

    let hasBucket = false;

    for (const bucket of buckets) {
      if (inRange(itemVal, bucket.from, bucket.to)) {
        agg.result[bucket.id] = get(agg.result, bucket.id) + 1;

        hasBucket = true;
        break;
      }
    }

    if (!hasBucket) {
      agg.rest += 1;
    }

    return agg;
  }, initializer);
}
