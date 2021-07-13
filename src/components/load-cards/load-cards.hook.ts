import { useCallback, useEffect, useMemo } from 'react';
import useAsyncState from '../../hooks/use-async-state';
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

  const isCardNamesLoaded: boolean = typeof cardNamesState.data !== 'undefined';
  const isSetCodesLoaded: boolean = typeof setCodesState.data !== 'undefined';
  const isSetIndexCardIndexMultiverseIdsLoaded: boolean =
    typeof setIndexCardIndexMultiverseIdsState.data !== 'undefined';
  const isSetNamesLoaded: boolean = typeof setNamesState.data !== 'undefined';
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
