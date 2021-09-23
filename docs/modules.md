[domo-aggregato](README.md) / Exports

# domo-aggregato

## Table of contents

### Enumerations

- [Operations](enums/Operations.md)

### Classes

- [AggregationResult](classes/AggregationResult.md)
- [BucketResult](classes/BucketResult.md)
- [CountResult](classes/CountResult.md)
- [IntermediateAggregationResult](classes/IntermediateAggregationResult.md)

### Interfaces

- [AggregationOptions](interfaces/AggregationOptions.md)
- [NumberBucket](interfaces/NumberBucket.md)

### Type aliases

- [Iteratee](modules.md#iteratee)
- [IterateeFunc](modules.md#iterateefunc)

### Functions

- [aggregateByNumberBuckets](modules.md#aggregatebynumberbuckets)
- [aggregateByStringBuckets](modules.md#aggregatebystringbuckets)
- [aggregationResultAsArray](modules.md#aggregationresultasarray)
- [countByNumberBuckets](modules.md#countbynumberbuckets)
- [countByStringBuckets](modules.md#countbystringbuckets)

## Type aliases

### Iteratee

Ƭ **Iteratee**<`T`, `Y`\>: keyof `T` \| [`IterateeFunc`](modules.md#iterateefunc)<`T`, `Y`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `Y` |

#### Defined in

modules/accesor.ts:6

___

### IterateeFunc

Ƭ **IterateeFunc**<`T`, `Y`\>: (`d`: `T`) => `Y`

#### Type parameters

| Name |
| :------ |
| `T` |
| `Y` |

#### Type declaration

▸ (`d`): `Y`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `T` |

##### Returns

`Y`

#### Defined in

modules/accesor.ts:4

## Functions

### aggregateByNumberBuckets

▸ **aggregateByNumberBuckets**<`T`\>(`array`, `buckets`, `aggregationOptions`): [`AggregationResult`](classes/AggregationResult.md)

Performs an aggregation operation using number-based buckets

**`export`**

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `buckets` | [`NumberBucket`](interfaces/NumberBucket.md)[] |
| `aggregationOptions` | `Except`<[`AggregationOptions`](interfaces/AggregationOptions.md)<`T`\>, ``"keyGetter"``\> |

#### Returns

[`AggregationResult`](classes/AggregationResult.md)

{AggregationResult}

#### Defined in

modules/aggregate.ts:104

___

### aggregateByStringBuckets

▸ **aggregateByStringBuckets**<`T`\>(`array`, `buckets`, `aggregationOptions`): [`AggregationResult`](classes/AggregationResult.md)

Performs an aggregation operation using string-based buckets

**`export`**

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `buckets` | `string`[][] |
| `aggregationOptions` | [`AggregationOptions`](interfaces/AggregationOptions.md)<`T`\> |

#### Returns

[`AggregationResult`](classes/AggregationResult.md)

#### Defined in

modules/aggregate.ts:46

___

### aggregationResultAsArray

▸ **aggregationResultAsArray**(`aggResult`): `AggregationAsArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `aggResult` | [`AggregationResult`](classes/AggregationResult.md) |

#### Returns

`AggregationAsArray`

#### Defined in

helpers/array.ts:19

___

### countByNumberBuckets

▸ **countByNumberBuckets**<`T`\>(`array`, `buckets`, `iteratee`): [`CountResult`](classes/CountResult.md)

Count the amount of items inside a number bucket in a collection

**`export`**

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `buckets` | [`NumberBucket`](interfaces/NumberBucket.md)[] |
| `iteratee` | [`Iteratee`](modules.md#iteratee)<`T`, `number`\> |

#### Returns

[`CountResult`](classes/CountResult.md)

#### Defined in

modules/count.ts:65

___

### countByStringBuckets

▸ **countByStringBuckets**<`T`\>(`array`, `buckets`, `iteratee`): [`CountResult`](classes/CountResult.md)

Count the amount of times a certain string or chain of strings appear in a collection

**`export`**

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `buckets` | `string`[][] |
| `iteratee` | [`Iteratee`](modules.md#iteratee)<`T`, `string`\> |

#### Returns

[`CountResult`](classes/CountResult.md)

#### Defined in

modules/count.ts:18
