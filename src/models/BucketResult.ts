export class BucketResult {
  public value: number;

  public events: number;

  constructor(value: number = 0, events: number = 0) {
    this.value = value;
    this.events = events;
  }
}
