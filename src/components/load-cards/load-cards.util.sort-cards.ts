import type MagicCard from '../../types/magic-card';

const SORT_PREVIOUS = -1;
const SORT_NEXT = 1;

export default function sortCards(one: MagicCard, two: MagicCard): number {
  if (one.cardName < two.cardName) {
    return SORT_PREVIOUS;
  }
  if (one.cardName > two.cardName) {
    return SORT_NEXT;
  }
  if (one.multiverseId < two.multiverseId) {
    return SORT_PREVIOUS;
  }
  return SORT_NEXT;
}
