import type Default from '../types/default';
import isDefault from '../utils/is-default';

export default function validateDefault<T>(value: unknown): Default<T> {
  if (!isDefault<T>(value)) {
    throw new Error('Value is not a default export.');
  }

  return value;
}
