import isNumber from '../utils/is-number';

export default function isArrayOfNumbers(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}
