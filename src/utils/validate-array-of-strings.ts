import isArrayOfStrings from '../utils/is-array-of-strings';

export default function validateArrayOfStrings(value: unknown): string[] {
  if (!isArrayOfStrings(value)) {
    throw new Error('Expected an array of strings.');
  }

  return value;
}
