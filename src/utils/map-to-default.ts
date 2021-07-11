import type Default from '../types/default';

export default function mapToDefault<T>(t: Readonly<Default<T>>): T {
  return t.default;
}
