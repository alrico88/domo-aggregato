import { BucketResult } from './BucketResult';

export class AggregationResult {
  public results: Record<string, BucketResult>;

  public rest: BucketResult;

  constructor() {
    this.results = {};
    this.rest = new BucketResult();
  }
}
