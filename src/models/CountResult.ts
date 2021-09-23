export interface NumberBucket {
  id: string,
  from: number,
  to: number,
  [key: string]: any,
}

export class CountResult {
  public result: Record<string, number>;

  public rest: number;

  constructor() {
    this.result = {};
    this.rest = 0;
  }
}
