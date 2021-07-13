import mapToDefault from '../utils/map-to-default';
import validateArrayOfStrings from '../utils/validate-array-of-strings';
import validateDefault from '../utils/validate-default';

export default async function fetchCardNames(): Promise<string[]> {
  return import('../data/card-names.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateArrayOfStrings);
}
