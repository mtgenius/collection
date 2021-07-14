import isRecordOf from '../utils/is-record-of';
import isString from '../utils/is-string';

export default function isRecordOfStrings(
  value: unknown,
): value is Record<number | string, string> {
  return isRecordOf(value, isString);
}
