import mapToDefault from '../utils/map-to-default';
import validateDefault from '../utils/validate-default';
import validateRecordOfRecordOfNumbers from '../utils/validate-record-of-record-of-numbers';

export default async function fetchSetIndexCardIndexMultiverseIds(): Promise<
  Record<number | string, Record<number | string, number>>
> {
  return import('../data/set-index-card-index-multiverse-ids.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateRecordOfRecordOfNumbers);
}
