import type Default from '../types/default';
import isRecord from '../utils/is-record';

export default function isDefault<T>(value: unknown): value is Default<T> {
  return (
    isRecord(value) && Object.prototype.hasOwnProperty.call(value, 'default')
  );
}
