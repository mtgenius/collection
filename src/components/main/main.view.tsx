import type { ReactElement } from 'react';
import { StrictMode, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import useAsyncState from '../../hooks/use-async-state';
import type MetaData from '../../types/meta-data';
import isError from '../../utils/is-error';

interface Props {
  readonly fetchMetaData: () => Promise<MetaData>;
}

export default function Main({ fetchMetaData }: Props): ReactElement {
  const [metaDataState, setMetaDataState] = useAsyncState<MetaData>();

  useEffect((): void => {
    const handleNewMetaDataError = (err: unknown): void => {
      setMetaDataState({
        error: isError(err) ? err : new Error(JSON.stringify(err)),
        loading: false,
      });
    };

    const handleNewMetaDataSuccess = (
      newMetaData: Readonly<MetaData>,
    ): void => {
      setMetaDataState({
        data: newMetaData,
        loading: false,
      });
    };

    fetchMetaData()
      .then(handleNewMetaDataSuccess)
      .catch(handleNewMetaDataError);
  }, [fetchMetaData, setMetaDataState]);

  if (metaDataState.loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (metaDataState.error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>
          There was an error loading the application metadata.
        </Alert.Heading>
        <p>{metaDataState.error.message}</p>
      </Alert>
    );
  }

  return (
    <StrictMode>
      <div>Last updated: {metaDataState.data.date}</div>
    </StrictMode>
  );
}
