import isArrayOfNumbers from '../utils/is-array-of-numbers';

export default function validateArrayOfNumbers(value: unknown): number[] {
  if (!isArrayOfNumbers(value)) {
    throw new Error('Expected an array of numbers.');
  }

  return value;
}
