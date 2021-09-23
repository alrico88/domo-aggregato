# domo-aggregato

Count or aggregate arrays by string or number buckets

## Installation

Using npm:

`npm i domo-aggregato`

Using yarn:

`yarn add domo-aggregato`

## Usage

Using CommonJS

```javascript
const { countByStringBuckets } = require('domo-aggregato');

const stringArray = [
  {
    prop: 'A'
  },
  {
    prop: 'B'
  },
  {
    prop: 'C'
  },
]

// Count items where 'prop' property is either A or B
countByStringBuckets(stringArray, [['A', 'B']], 'prop') // {result: 2, rest: 1}
```

Using imports

```javascript
import { aggregateByNumberBuckets, Operations } from 'domo-aggregato';

const buckets = [
  {
    id: 'Less than 10',
    from: 1,
    to: 10,
  },
  {
    id: 'Between 11 and 20',
    from: 11,
    to: 20,
  },
];

const numArray = [
  {
    someProp: 'A',
    val: 4,
  },
  {
    someProp: 'B',
    val: 6,
  },
  {
    someProp: 'A',
    val: 100,
  }
];

aggregateByNumberBuckets(numArray, buckets, {
  valueGetter: 'val',
  operation: Operations.SUM,
}) // { result: {'Less than 10': { value: 10, events: 2 }, 'Between 11 and 20': { value: 0, events: 0 } }, rest: { value: 100, events: 1 } }
```

## Documentation

Better docs are coming soon.

See [DOCS](./docs/modules.md)
