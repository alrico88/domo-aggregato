import {
  calcSum, calcMax, calcMin, calcMean, calcWeightedMean, calcMedian, calcWeightedMedian,
} from 'math-helper-functions';
import { BucketResult } from '../models/BucketResult';

export function inRange(n: number, from: number, to: number): boolean {
  return n >= from && n <= to;
}

export enum Operations {
  MEAN,
  WEIGHTED_MEAN,
  MEDIAN,
  WEIGHTED_MEDIAN,
  SUM,
  MAX,
  MIN,
}

export function performOperation(bucketData: BucketResult[], operation: Operations): BucketResult {
  const totalEvents = calcSum(bucketData, 'events');
  let value: number;

  switch (operation) {
    case Operations.MAX:
      value = calcMax(bucketData, 'value');
      break;
    case Operations.MIN:
      value = calcMin(bucketData, 'value');
      break;
    case Operations.SUM:
      value = calcSum(bucketData, 'value');
      break;
    case Operations.MEAN:
      value = calcMean(bucketData, 'value') || 0;
      break;
    case Operations.WEIGHTED_MEAN:
      value = calcWeightedMean(bucketData, 'value', 'events');
      break;
    case Operations.MEDIAN:
      value = calcMedian(bucketData, 'value') || 0;
      break;
    case Operations.WEIGHTED_MEDIAN:
      value = calcWeightedMedian(bucketData, 'value', 'events') || 0;
      break;
    default:
      throw new Error('unknown operation');
  }

  return new BucketResult(value, totalEvents);
}
