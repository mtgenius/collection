import type { ReactElement, ReactNode } from 'react';
import type MetadataType from '../../types/metadata';
import useMetadata from './metadata.hook';
import Error from './metadata.view.error';
import Loading from './metadata.view.loading';

interface Props {
  readonly children: (metadata: MetadataType) => ReactNode;
  readonly fetchMetadata: () => Promise<MetadataType>;
}

export default function Metadata({
  children,
  fetchMetadata,
}: Props): ReactElement {
  const { handleRetryClick, metadataState } = useMetadata({ fetchMetadata });

  if (metadataState.loading) {
    return <Loading />;
  }

  if (metadataState.error) {
    return (
      <Error onRetryClick={handleRetryClick}>
        {metadataState.error.message}
      </Error>
    );
  }

  return <>{children(metadataState.data)}</>;
}
