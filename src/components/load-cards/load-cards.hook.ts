import { useCallback, useEffect, useMemo } from 'react';
import useAsyncState from '../../hooks/use-async-state';
import type MagicCard from '../../types/magic-card';
import NOOP from '../../utils/noop';

interface Props {
  readonly cardNamesSize: number;
  readonly fetchCardNames: () => Promise<string[]>;
  readonly fetchSetCodes: () => Promise<string[]>;
  readonly fetchSetNames: () => Promise<string[]>;
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
  fetchSetCodes,
  fetchSetIndexCardIndexMultiverseIds,
  fetchSetNames,
  setCodesSize,
  setIndexCardIndexMultiverseIdsSize,
  setNamesSize,
}: Props): State {
  const [cardNamesState, initCardNamesState] = useAsyncState(fetchCardNames);
  const [setCodesState, initSetCodesState] = useAsyncState(fetchSetCodes);
  const [setNamesState, initSetNamesState] = useAsyncState(fetchSetNames);
  const [
    setIndexCardIndexMultiverseIdsState,
    initSetIndexCardIndexMultiverseIdsState,
  ] = useAsyncState(fetchSetIndexCardIndexMultiverseIds);

  useEffect((): void => {
    initCardNamesState().catch(NOOP);
    initSetCodesState().catch(NOOP);
    initSetNamesState().catch(NOOP);
    initSetIndexCardIndexMultiverseIdsState().catch(NOOP);
  }, [
    initCardNamesState,
    initSetCodesState,
    initSetNamesState,
    initSetIndexCardIndexMultiverseIdsState,
  ]);

  const cardNames: string[] | undefined = cardNamesState.data;
  const multiverseIds:
    | Record<number | string, Record<number | string, number>>
    | undefined = setIndexCardIndexMultiverseIdsState.data;
  const setCodes: string[] | undefined = setCodesState.data;
  const setNames: string[] | undefined = setNamesState.data;
  const isCardNamesLoaded: boolean = typeof cardNames !== 'undefined';
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
      isSetCodesLoaded,
      isSetIndexCardIndexMultiverseIdsLoaded,
      isSetNamesLoaded,
      setCodesSize,
      setNamesSize,
      setIndexCardIndexMultiverseIdsSize,
    ]),

    bytesTotal:
      cardNamesSize +
      setCodesSize +
      setIndexCardIndexMultiverseIdsSize +
      setNamesSize,

    cards: useMemo((): MagicCard[] => {
      const newCards: MagicCard[] = [];
      if (typeof cardNames === 'undefined') {
        return newCards;
      }
      if (typeof multiverseIds === 'undefined') {
        return newCards;
      }
      if (typeof setCodes === 'undefined') {
        return newCards;
      }
      if (typeof setNames === 'undefined') {
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
            setCode,
            setName,
          });
        }
      }

      return newCards;
    }, [cardNames, multiverseIds, setCodes, setNames]),

    errors: useMemo((): Error[] => {
      const newErrors: Error[] = [];
      if (cardNamesState.error) {
        newErrors.push(cardNamesState.error);
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
      setCodesState.error,
      setIndexCardIndexMultiverseIdsState.error,
      setNamesState.error,
    ]),

    handleRetryClick: useCallback(async (): Promise<unknown[]> => {
      const inits: Promise<unknown>[] = [];
      if (cardNamesState.error) {
        inits.push(initCardNamesState());
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
      initSetCodesState,
      initSetIndexCardIndexMultiverseIdsState,
      initSetNamesState,
      setCodesState.error,
      setIndexCardIndexMultiverseIdsState.error,
      setNamesState.error,
    ]),
  };
}
