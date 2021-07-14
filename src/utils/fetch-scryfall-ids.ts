import mapToDefault from '../utils/map-to-default';
import validateDefault from '../utils/validate-default';
import validateRecordOfStrings from '../utils/validate-record-of-strings';

export default async function fetchScryfallIds(): Promise<
  Record<string, string>
> {
  return import('../data/scryfall-ids.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateRecordOfStrings);
}
