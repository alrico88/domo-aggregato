import {
  aggregateByNumberBuckets,
  aggregateByStringBuckets,
  BucketResult,
  countByNumberBuckets,
  countByStringBuckets,
  NumberBucket,
  Operations,
} from '../src/index';

const stringArray = [
  {
    prop: 'A',
    events: 5,
    value: 1,
  },
  {
    prop: 'A',
    events: 5,
    value: 2,
  },
  {
    prop: 'B',
    events: 5,
    value: 1,
  },
];

const numberArray = [
  {
    num: 3,
    events: 1,
    value: 1,
  },
  {
    num: 4,
    events: 5,
    value: 5,
  },
  {
    num: 10,
    events: 1,
    value: 3,
  },
  {
    num: 600,
    events: 1,
    value: 6,
  },
];

const numBuckets: NumberBucket[] = [
  {
    from: 1,
    to: 3,
    id: 'First',
  },
  {
    from: 4,
    to: 10,
    id: 'Second',
  },
  {
    from: 50,
    to: 60,
    id: 'Third',
  },
];

describe('Test string counting methods', () => {
  it('Should count strings correctly', () => {
    expect(countByStringBuckets(stringArray, [['A']], 'prop').result).toStrictEqual({ A: 2 });
  });

  it('Should count the rest correctly', () => {
    expect(countByStringBuckets(stringArray, [['A']], 'prop').rest).toBe(1);
  });

  it('Should count grouped strings correctly', () => {
    expect(countByStringBuckets(stringArray, [['A', 'B']], 'prop').result).toStrictEqual({ 'A, B': 3 });
  });

  it('Should return 0 if no rest', () => {
    expect(countByStringBuckets(stringArray, [['A', 'B']], 'prop').rest).toBe(0);
  });
});

describe('Test number counting methods', () => {
  it('Should count strings correctly', () => {
    expect(countByNumberBuckets(numberArray, numBuckets, 'num').result.First).toBe(1);
  });

  it('Should count the rest correctly', () => {
    expect(countByNumberBuckets(numberArray, numBuckets, 'num').rest).toBe(1);
  });

  it("Should return 0 if bucket doesn't have anything inside", () => {
    expect(countByNumberBuckets(numberArray, numBuckets, 'num').result.Third).toBe(0);
  });
});

describe('Test string aggregations', () => {
  it('Should perform operations correctly', () => {
    expect(aggregateByStringBuckets(stringArray, [['A']], {
      keyGetter: 'prop',
      valueGetter: 'value',
      eventsGetter: 'events',
      operation: Operations.SUM,
    }).results).toStrictEqual({ A: new BucketResult(3, 10) });
  });

  it('Should calculate rest correctly', () => {
    expect(aggregateByStringBuckets(stringArray, [['A']], {
      keyGetter: 'prop',
      valueGetter: 'value',
      eventsGetter: 'events',
      operation: Operations.MAX,
    }).rest).toStrictEqual(new BucketResult(1, 5));
  });
});

describe('Test number aggregations', () => {
  it('Should perform operations correctly', () => {
    expect(aggregateByNumberBuckets(numberArray, numBuckets, {
      valueGetter: 'value',
      eventsGetter: 'events',
      operation: Operations.SUM,
    }).results).toStrictEqual({
      First: new BucketResult(4, 2),
      Second: new BucketResult(11, 6),
      Third: new BucketResult(0, 0),
    });
  });

  it('Should calculate rest correctly', () => {
    expect(aggregateByNumberBuckets(numberArray, numBuckets, {
      valueGetter: 'value',
      eventsGetter: 'events',
      operation: Operations.MAX,
    }).rest).toStrictEqual(new BucketResult(0, 0));
  });
});
