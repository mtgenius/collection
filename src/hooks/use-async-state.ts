import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type AsyncState from '../types/async-state';

const getDefaultState = <T>(): AsyncState<T> => ({
  loading: true,
});

export default function useAsyncState<T>(): [
  AsyncState<T>,
  Dispatch<SetStateAction<AsyncState<T>>>,
] {
  return useState<AsyncState<T>>(getDefaultState);
}
