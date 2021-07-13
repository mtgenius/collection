import isRecord from '../utils/is-record';

export default function isRecordOf<T>(
  value: unknown,
  isOfType: (item: unknown) => item is T,
): value is Record<number | string, T> {
  return isRecord(value) && Object.values(value).every(isOfType);
}
