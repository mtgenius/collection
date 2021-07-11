import type MetaData from '../types/meta-data';
import isMetaData from '../utils/is-meta-data';

export default function validateMetaData(value: unknown): MetaData {
  if (!isMetaData(value)) {
    throw new Error('Value is not meta data.');
  }

  return value;
}
