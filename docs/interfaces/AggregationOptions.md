[domo-aggregato](../README.md) / [Exports](../modules.md) / AggregationOptions

# Interface: AggregationOptions<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [eventsGetter](AggregationOptions.md#eventsgetter)
- [keyGetter](AggregationOptions.md#keygetter)
- [operation](AggregationOptions.md#operation)
- [valueGetter](AggregationOptions.md#valuegetter)

## Properties

### eventsGetter

• `Optional` **eventsGetter**: [`Iteratee`](../modules.md#iteratee)<`T`, `number`\>

#### Defined in

modules/aggregate.ts:15

___

### keyGetter

• **keyGetter**: [`Iteratee`](../modules.md#iteratee)<`T`, `string`\>

#### Defined in

modules/aggregate.ts:13

___

### operation

• **operation**: [`Operations`](../enums/Operations.md)

#### Defined in

modules/aggregate.ts:16

___

### valueGetter

• **valueGetter**: [`Iteratee`](../modules.md#iteratee)<`T`, `number`\>

#### Defined in

modules/aggregate.ts:14
