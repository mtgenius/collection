import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';

const NONE = 0;
const SINGLE = 1;

export default function useSubtractFromCollection(
  setCollection: Dispatch<SetStateAction<Map<number, number>>>,
): (multiverseId: number) => void {
  return useCallback(
    (multiverseId: number): void => {
      setCollection(
        (oldCollection: Readonly<Map<number, number>>): Map<number, number> => {
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
    },
    [setCollection],
  );
}
