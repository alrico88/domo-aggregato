import is from '@sindresorhus/is';
import get from 'lodash/get';

export type IterateeFunc<T, Y> = (d: T) => Y;

export type Iteratee<T, Y> = keyof T | IterateeFunc<T, Y>;

export function getAccessor<T, Y>(iteratee: string | Iteratee<T, Y>): IterateeFunc<T, Y> {
  if (is.string(iteratee)) {
    return function fallbackIteratee(d: T): Y {
      return get(d, iteratee) as Y;
    };
  }

  return iteratee as IterateeFunc<T, Y>;
}
