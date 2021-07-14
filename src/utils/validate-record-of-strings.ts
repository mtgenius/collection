import isRecordOfStrings from '../utils/is-record-of-strings';

export default function validateRecordOfStrings(
  value: unknown,
): Record<number | string, string> {
  if (!isRecordOfStrings(value)) {
    throw new Error('Expected record of strings.');
  }

  return value;
}
