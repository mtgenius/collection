import isRecordOf from '../utils/is-record-of';
import isRecordOfNumbers from '../utils/is-record-of-numbers';

export default function isRecordOfRecordOfNumbers(
  value: unknown,
): value is Record<number | string, Record<number | string, number>> {
  return isRecordOf(value, isRecordOfNumbers);
}
