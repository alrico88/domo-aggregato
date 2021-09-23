export { countByStringBuckets, countByNumberBuckets } from './modules/count';
export { aggregateByStringBuckets, aggregateByNumberBuckets, AggregationOptions } from './modules/aggregate';
export { AggregationResult } from './models/AggregationResult';
export { BucketResult } from './models/BucketResult';
export { CountResult, NumberBucket } from './models/CountResult';
export { IntermediateAggregationResult } from './models/IntermediateAggregationResult';
export { Operations } from './helpers/operations';
export { Iteratee, IterateeFunc } from './modules/accesor';
export { aggregationResultAsArray } from './helpers/array';
