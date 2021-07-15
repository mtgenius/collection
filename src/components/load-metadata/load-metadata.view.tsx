import type { ReactElement, ReactNode } from 'react';
import type MetadataType from '../../types/metadata';
import useLoadMetadata from './load-metadata.hook';
import Error from './load-metadata.view.error';
import Loading from './load-metadata.view.loading';

interface Props {
  readonly children: (metadata: MetadataType) => ReactNode;
  readonly fetchMetadata: () => Promise<MetadataType>;
}

export default function LoadMetadata({
  children,
  fetchMetadata,
}: Props): ReactElement {
  const { handleRetryClick, metadataState } = useLoadMetadata({
    fetchMetadata,
  });

  if (metadataState.loading) {
    return <Loading />;
  }

  if (metadataState.error) {
    return <Error onRetryClick={handleRetryClick}>{metadataState.error}</Error>;
  }

  return <>{children(metadataState.data)}</>;
}
