import type Default from '../types/default';
import isDefault from './is-default';

export default function mapToDefault<T>(t: Default<T> | T): T {
  if (isDefault(t)) {
    return t.default;
  }

  return t;
}
