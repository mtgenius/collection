import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import MetaData from '../../components/meta-data';
import ScreenReaderOnly from '../../components/screen-reader-only';
import type Locale from '../../constants/locale';
import type MetaDataType from '../../types/meta-data';
import useMain from './main.hook';

interface Props {
  readonly fetchMetaData: () => Promise<MetaDataType>;
  readonly onLocaleChange: (locale: Locale) => void;
}

export default function Main({ fetchMetaData }: Props): ReactElement {
  const { metaDataState } = useMain({ fetchMetaData });

  if (metaDataState.loading) {
    return (
      <Spinner animation="border" role="status">
        <ScreenReaderOnly>
          <I18n>Loading metadata</I18n>
        </ScreenReaderOnly>
      </Spinner>
    );
  }

  if (metaDataState.error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>
          <I18n>There was an error loading the application metadata.</I18n>
        </Alert.Heading>
        <p>{metaDataState.error.message}</p>
      </Alert>
    );
  }

  return <MetaData {...metaDataState.data} />;
}
