import type { NonCancelableCustomEvent } from '@awsui/components-react';
import type { CardsProps } from '@awsui/components-react/cards';
import type { PaginationProps } from '@awsui/components-react/pagination';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import { usePagination, useTextFilter } from 'use-awsui';
import type MagicCard from '../../types/magic-card';
import useCardDefinition from './cards-cards.hook.card-definition';

interface State {
  readonly cardDefinition: CardsProps.CardDefinition<MagicCard>;
  readonly currentPageIndex: number;
  readonly filteringPlaceholder?: string;
  readonly filteringText: string;
  readonly handleClearFilter: () => void;
  readonly items: readonly MagicCard[];
  readonly pagesCount: number;
  readonly selectedItems: readonly MagicCard[];
  readonly handleTextFilterChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
    >,
  ) => void;
  readonly handlePaginationChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_COLLECTION: Map<number, number> = new Map<number, number>();
const NONE = 0;
const PAGE_SIZE = 8;
const SINGLE = 1;

export default function useCardsCards(cards: readonly MagicCard[]): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    currentPageIndex,
    handleChange: handlePaginationChange,
    paginate,
  } = usePagination({
    pageSize: PAGE_SIZE,
  });

  const [collection, setCollection] =
    useState<Map<number, number>>(DEFAULT_COLLECTION);

  const {
    filteringText,
    handleChange: handleTextFilterChange,
    setFilteringText,
  } = useTextFilter();

  const lowerCaseFilteringText: string = filteringText.toLowerCase();
  const filteredItems: readonly MagicCard[] =
    useMemo((): readonly MagicCard[] => {
      if (lowerCaseFilteringText === '') {
        return cards;
      }

      const filterByName = ({ cardName }: MagicCard): boolean =>
        cardName.toLowerCase().includes(lowerCaseFilteringText);
      return cards.filter(filterByName);
    }, [cards, lowerCaseFilteringText]);

  return {
    currentPageIndex,
    filteringPlaceholder: translate('Filter by name'),
    filteringText,
    handlePaginationChange,
    handleTextFilterChange,
    pagesCount: Math.ceil(filteredItems.length / PAGE_SIZE),

    cardDefinition: useCardDefinition({
      collection,
      onAddToCollection: useCallback((multiverseId: number): void => {
        setCollection(
          (
            oldCollection: Readonly<Map<number, number>>,
          ): Map<number, number> => {
            const newCollection: Map<number, number> = new Map(oldCollection);
            const oldCount: number = oldCollection.get(multiverseId) ?? NONE;
            newCollection.set(multiverseId, oldCount + SINGLE);
            return newCollection;
          },
        );
      }, []),
      onSubtractFromCollection: useCallback((multiverseId: number): void => {
        setCollection(
          (
            oldCollection: Readonly<Map<number, number>>,
          ): Map<number, number> => {
            const oldCount: number = oldCollection.get(multiverseId) ?? NONE;
            if (oldCount === NONE) {
              return oldCollection;
            }

            const newCollection: Map<number, number> = new Map(oldCollection);
            if (oldCount === SINGLE) {
              newCollection.delete(multiverseId);
            } else {
              newCollection.set(multiverseId, oldCount - SINGLE);
            }
            return newCollection;
          },
        );
      }, []),
    }),

    handleClearFilter: useCallback((): void => {
      setFilteringText('');
    }, [setFilteringText]),

    items: useMemo(
      (): readonly MagicCard[] => paginate(filteredItems),
      [filteredItems, paginate],
    ),

    selectedItems: useMemo((): readonly MagicCard[] => {
      const filterBySelected = ({ multiverseId }: MagicCard): boolean =>
        collection.has(multiverseId);
      return cards.filter(filterBySelected);
    }, [cards, collection]),
  };
}
