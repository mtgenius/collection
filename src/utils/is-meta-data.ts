import type MetaData from '../types/meta-data';
import isRecord from '../utils/is-record';

export default function isMetaData(value: unknown): value is MetaData {
  return (
    isRecord(value) &&
    Object.prototype.hasOwnProperty.call(value, 'cardKingdomIdsSize') &&
    Object.prototype.hasOwnProperty.call(value, 'cardNamesSize') &&
    Object.prototype.hasOwnProperty.call(value, 'date') &&
    Object.prototype.hasOwnProperty.call(value, 'setCodesSize') &&
    Object.prototype.hasOwnProperty.call(value, 'setNamesSize') &&
    Object.prototype.hasOwnProperty.call(value, 'tcgplayerProductIdsSize') &&
    Object.prototype.hasOwnProperty.call(
      value,
      'setIndexCardIndexMultiverseIdsSize',
    ) &&
    typeof value.cardKingdomIdsSize === 'number' &&
    typeof value.cardNamesSize === 'number' &&
    typeof value.date === 'string' &&
    typeof value.setCodesSize === 'number' &&
    typeof value.setIndexCardIndexMultiverseIdsSize === 'number' &&
    typeof value.setNamesSize === 'number' &&
    typeof value.tcgplayerProductIdsSize === 'number'
  );
}
