import type Metadata from '../types/metadata';
import isMetaData from '../utils/is-meta-data';

export default function validateMetaData(value: unknown): Metadata {
  if (!isMetaData(value)) {
    throw new Error('Expected meta data.');
  }

  return value;
}
