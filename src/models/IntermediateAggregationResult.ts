import { BucketResult } from './BucketResult';

export class IntermediateAggregationResult {
  public results: Record<string, BucketResult[]>;

  public rest: BucketResult[];

  constructor() {
    this.results = {};
    this.rest = [];
  }
}
