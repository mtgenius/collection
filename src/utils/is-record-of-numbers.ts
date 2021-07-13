import isNumber from '../utils/is-number';
import isRecordOf from '../utils/is-record-of';

export default function isRecordOfNumbers(
  value: unknown,
): value is Record<number | string, number> {
  return isRecordOf(value, isNumber);
}
