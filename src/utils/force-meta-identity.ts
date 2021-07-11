import type Meta from '../types/meta';

function forceIsMeta(_value: unknown): _value is Meta {
  return true;
}

export default function forceMetaIdentity(value: unknown): Meta {
  if (forceIsMeta(value)) {
    return value;
  }
  throw new Error();
}
