import { AggregationResult } from '../models/AggregationResult';

export interface AggregationResultAsArrayItem {
  bucket: string,
  value: number,
  events: number
}

export interface AggregationRestAsArrayItem {
  value: number,
  events: number
}

export interface AggregationAsArray {
  results: AggregationResultAsArrayItem[],
  rest: AggregationRestAsArrayItem
}

export function aggregationResultAsArray(aggResult: AggregationResult): AggregationAsArray {
  return {
    results: Object.entries(aggResult.results).reduce((agg, [key, { value, events }]) => [...agg, {
      bucket: key,
      value,
      events,
    }], [] as AggregationResultAsArrayItem[]),
    rest: aggResult.rest,
  };
}
