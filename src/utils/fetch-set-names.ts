import mapToDefault from '../utils/map-to-default';
import validateArrayOfStrings from '../utils/validate-array-of-strings';
import validateDefault from '../utils/validate-default';

export default async function fetchSetNames(): Promise<string[]> {
  return import('../data/set-names.json')
    .then(validateDefault)
    .then(mapToDefault)
    .then(validateArrayOfStrings);
}
