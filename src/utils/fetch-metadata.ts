import type Metadata from '../types/metadata';
import mapToDefault from '../utils/map-to-default';
import validateDefault from '../utils/validate-default';
import validateMetaData from '../utils/validate-meta-data';

export default async function fetchMetadata(): Promise<Metadata> {
  return import('../data/metadata.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateMetaData);
}
