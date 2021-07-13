import isRecordOfRecordOfNumbers from '../utils/is-record-of-record-of-numbers';

export default function validateRecordOfRecordOfNumbers(
  value: unknown,
): Record<number | string, Record<number | string, number>> {
  if (!isRecordOfRecordOfNumbers(value)) {
    throw new Error('Expected record of record of numbers.');
  }

  return value;
}
