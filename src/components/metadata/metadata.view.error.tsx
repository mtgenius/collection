import Alert from '@awsui/components-react/alert';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper';

interface Props {
  readonly children: string;
  readonly onRetryClick: () => void;
}

export default function MetadataError({
  children,
  onRetryClick,
}: Props): ReactElement {
  return (
    <Wrapper header={<Header />}>
      <Alert
        buttonText={<I18n>Retry</I18n>}
        dismissible={false}
        onButtonClick={onRetryClick}
        type="error"
        visible
        header={
          <I18n>There was an error loading the application metadata.</I18n>
        }
      >
        {children}
      </Alert>
    </Wrapper>
  );
}
