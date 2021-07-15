import { useEffect } from 'react';
import useAsyncState from '../../hooks/use-async-state';
import type AsyncState from '../../types/async-state';
import type Metadata from '../../types/metadata';
import NOOP from '../../utils/noop';

interface Props {
  readonly fetchMetadata: () => Promise<Metadata>;
}

interface State {
  readonly handleRetryClick: () => void;
  readonly metadataState: AsyncState<Metadata>;
}

export default function useLoadMetadata({ fetchMetadata }: Props): State {
  // States
  const [metadataState, initMetadataState] =
    useAsyncState<Metadata>(fetchMetadata);

  useEffect((): void => {
    initMetadataState().catch(NOOP);
  }, [initMetadataState]);

  return {
    handleRetryClick: initMetadataState,
    metadataState,
  };
}
