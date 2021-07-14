import type MagicCard from '../../types/magic-card';

interface State {
  readonly selectedItems: MagicCard[];
}

export default function useCardsCards(): State {
  return {
    selectedItems: [],
  };
}
