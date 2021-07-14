import { useCallback, useEffect, useMemo } from 'react';
import useAsyncState from '../../hooks/use-async-state';
import type MagicCard from '../../types/magic-card';
import NOOP from '../../utils/noop';

interface Props {
  readonly cardNamesSize: number;
  readonly fetchCardNames: () => Promise<string[]>;
  readonly fetchScryfallIds: () => Promise<Record<string, string>>;
  readonly fetchSetCodes: () => Promise<string[]>;
  readonly fetchSetNames: () => Promise<string[]>;
  readonly scryfallIdsSize: number;
  readonly setCodesSize: number;
  readonly setIndexCardIndexMultiverseIdsSize: number;
  readonly setNamesSize: number;
  readonly fetchSetIndexCardIndexMultiverseIds: () => Promise<
    Record<number | string, Record<number | string, number>>
  >;
}

interface State {
  readonly bytesLoaded: number;
  readonly bytesTotal: number;
  readonly cards: MagicCard[];
  readonly errors: Error[];
  readonly handleRetryClick: () => void;
}

export default function useLoadCards({
  cardNamesSize,
  fetchCardNames,
  fetchScryfallIds,
  fetchSetCodes,
  fetchSetIndexCardIndexMultiverseIds,
  fetchSetNames,
  scryfallIdsSize,
  setCodesSize,
  setIndexCardIndexMultiverseIdsSize,
  setNamesSize,
}: Props): State {
  const [cardNamesState, initCardNamesState] = useAsyncState(fetchCardNames);
  const [setCodesState, initSetCodesState] = useAsyncState(fetchSetCodes);
  const [setNamesState, initSetNamesState] = useAsyncState(fetchSetNames);
  const [scryfallIdsState, initScryfallIdsState] =
    useAsyncState(fetchScryfallIds);
  const [
    setIndexCardIndexMultiverseIdsState,
    initSetIndexCardIndexMultiverseIdsState,
  ] = useAsyncState(fetchSetIndexCardIndexMultiverseIds);

  useEffect((): void => {
    initCardNamesState().catch(NOOP);
    initScryfallIdsState().catch(NOOP);
    initSetCodesState().catch(NOOP);
    initSetNamesState().catch(NOOP);
    initSetIndexCardIndexMultiverseIdsState().catch(NOOP);
  }, [
    initCardNamesState,
    initScryfallIdsState,
    initSetCodesState,
    initSetNamesState,
    initSetIndexCardIndexMultiverseIdsState,
  ]);

  const cardNames: string[] | undefined = cardNamesState.data;
  const multiverseIds:
    | Record<number | string, Record<number | string, number>>
    | undefined = setIndexCardIndexMultiverseIdsState.data;
  const scryfallIds: Record<string, string> | undefined = scryfallIdsState.data;
  const setCodes: string[] | undefined = setCodesState.data;
  const setNames: string[] | undefined = setNamesState.data;
  const isCardNamesLoaded: boolean = typeof cardNames !== 'undefined';
  const isScryfallIdsLoaded: boolean = typeof scryfallIds !== 'undefined';
  const isSetCodesLoaded: boolean = typeof setCodes !== 'undefined';
  const isSetIndexCardIndexMultiverseIdsLoaded: boolean =
    typeof multiverseIds !== 'undefined';
  const isSetNamesLoaded: boolean = typeof setNames !== 'undefined';
  return {
    bytesLoaded: useMemo((): number => {
      let newBytesLoaded = 0;
      if (isCardNamesLoaded) {
        newBytesLoaded += cardNamesSize;
      }
      if (isScryfallIdsLoaded) {
        newBytesLoaded += scryfallIdsSize;
      }
      if (isSetCodesLoaded) {
        newBytesLoaded += setCodesSize;
      }
      if (isSetIndexCardIndexMultiverseIdsLoaded) {
        newBytesLoaded += setIndexCardIndexMultiverseIdsSize;
      }
      if (isSetNamesLoaded) {
        newBytesLoaded += setNamesSize;
      }
      return newBytesLoaded;
    }, [
      cardNamesSize,
      isCardNamesLoaded,
      isScryfallIdsLoaded,
      isSetCodesLoaded,
      isSetIndexCardIndexMultiverseIdsLoaded,
      isSetNamesLoaded,
      scryfallIdsSize,
      setCodesSize,
      setNamesSize,
      setIndexCardIndexMultiverseIdsSize,
    ]),

    bytesTotal:
      cardNamesSize +
      scryfallIdsSize +
      setCodesSize +
      setIndexCardIndexMultiverseIdsSize +
      setNamesSize,

    cards: useMemo((): MagicCard[] => {
      const newCards: MagicCard[] = [];
      if (
        typeof cardNames === 'undefined' ||
        typeof multiverseIds === 'undefined' ||
        typeof scryfallIds === 'undefined' ||
        typeof setCodes === 'undefined' ||
        typeof setNames === 'undefined'
      ) {
        return newCards;
      }

      for (const [setIndexStr, cardsRecord] of Object.entries(multiverseIds)) {
        const setIndex: number = parseInt(setIndexStr, 10);
        const setCode: string = setCodes[setIndex];
        const setName: string = setNames[setIndex];
        for (const [cardIndexStr, multiverseId] of Object.entries(
          cardsRecord,
        )) {
          const cardIndex: number = parseInt(cardIndexStr, 10);
          newCards.push({
            cardName: cardNames[cardIndex],
            multiverseId,
            scryfallId: scryfallIds[multiverseId],
            setCode,
            setName,
          });
        }
      }

      return newCards;
    }, [cardNames, multiverseIds, scryfallIds, setCodes, setNames]),

    errors: useMemo((): Error[] => {
      const newErrors: Error[] = [];
      if (cardNamesState.error) {
        newErrors.push(cardNamesState.error);
      }
      if (scryfallIdsState.error) {
        newErrors.push(scryfallIdsState.error);
      }
      if (setCodesState.error) {
        newErrors.push(setCodesState.error);
      }
      if (setIndexCardIndexMultiverseIdsState.error) {
        newErrors.push(setIndexCardIndexMultiverseIdsState.error);
      }
      if (setNamesState.error) {
        newErrors.push(setNamesState.error);
      }
      return newErrors;
    }, [
      cardNamesState.error,
      scryfallIdsState.error,
      setCodesState.error,
      setIndexCardIndexMultiverseIdsState.error,
      setNamesState.error,
    ]),

    handleRetryClick: useCallback(async (): Promise<unknown[]> => {
      const inits: Promise<unknown>[] = [];
      if (cardNamesState.error) {
        inits.push(initCardNamesState());
      }
      if (scryfallIdsState.error) {
        inits.push(initScryfallIdsState());
      }
      if (setCodesState.error) {
        inits.push(initSetCodesState());
      }
      if (setIndexCardIndexMultiverseIdsState.error) {
        inits.push(initSetIndexCardIndexMultiverseIdsState());
      }
      if (setNamesState.error) {
        inits.push(initSetNamesState());
      }
      return Promise.all(inits);
    }, [
      cardNamesState.error,
      initCardNamesState,
      initScryfallIdsState,
      initSetCodesState,
      initSetIndexCardIndexMultiverseIdsState,
      initSetNamesState,
      scryfallIdsState.error,
      setCodesState.error,
      setIndexCardIndexMultiverseIdsState.error,
      setNamesState.error,
    ]),
  };
}
