import { useEffect } from 'react';
import useAsyncState from '../../hooks/use-async-state';
import type AsyncState from '../../types/async-state';
import type MetaData from '../../types/meta-data';

interface Props {
  readonly fetchMetaData: () => Promise<MetaData>;
}

interface State {
  metaDataState: AsyncState<MetaData>;
}

export default function useMain({ fetchMetaData }: Props): State {
  // States
  const [metaDataState, initMetaDataState] =
    useAsyncState<MetaData>(fetchMetaData);

  useEffect((): void => {
    initMetaDataState();
  }, [initMetaDataState]);

  return {
    metaDataState,
  };
}
