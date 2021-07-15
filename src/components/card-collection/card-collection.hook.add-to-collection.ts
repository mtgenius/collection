import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';

const NONE = 0;
const SINGLE = 1;

export default function useAddToCollection(
  setCollection: Dispatch<SetStateAction<Map<number, number>>>,
): (multiverseId: number) => void {
  return useCallback(
    (multiverseId: number): void => {
      setCollection(
        (oldCollection: Readonly<Map<number, number>>): Map<number, number> => {
          const newCollection: Map<number, number> = new Map(oldCollection);
          const oldCount: number = oldCollection.get(multiverseId) ?? NONE;
          newCollection.set(multiverseId, oldCount + SINGLE);
          return newCollection;
        },
      );
    },
    [setCollection],
  );
}
