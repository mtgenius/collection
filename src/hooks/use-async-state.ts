import type { Reducer } from 'react';
import { useCallback, useReducer } from 'react';
import type AsyncState from '../types/async-state';

interface ErrorAction {
  error: Error;
  type: 'ERROR';
}

interface InitAction {
  type: 'INIT';
}

interface SuccessAction<T> {
  data: T;
  type: 'SUCCESS';
}

const defaultInitializer = <T>(): AsyncState<T> => ({
  loading: true,
});

const reducer = <T>(
  _prevState: AsyncState<T>,
  action: ErrorAction | InitAction | SuccessAction<T>,
): AsyncState<T> => {
  switch (action.type) {
    case 'ERROR':
      return {
        error: action.error,
        loading: false,
      };
    case 'INIT':
      return {
        loading: true,
      };
    case 'SUCCESS':
      return {
        data: action.data,
        loading: false,
      };
  }
};

export default function useAsyncState<T>(
  act: () => Promise<T>,
): [AsyncState<T>, VoidFunction] {
  const [state, dispatch] = useReducer<
    Reducer<AsyncState<T>, ErrorAction | InitAction | SuccessAction<T>>,
    null
  >(reducer, null, defaultInitializer);

  return [
    state,
    useCallback((): void => {
      dispatch({ type: 'INIT' });
      act()
        .then((data: T): void => {
          dispatch({
            data,
            type: 'SUCCESS',
          });
        })
        .catch((err: Readonly<Error>): void => {
          dispatch({
            error: err,
            type: 'ERROR',
          });
        });
    }, [act]),
  ];
}
