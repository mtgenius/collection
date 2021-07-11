import type MetaData from '../types/meta-data';
import mapToDefault from '../utils/map-to-default';
import validateDefault from '../utils/validate-default';
import validateMetaData from '../utils/validate-meta-data';

export default async function fetchMetaData(): Promise<MetaData> {
  return import('../data/meta.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateMetaData);
}
