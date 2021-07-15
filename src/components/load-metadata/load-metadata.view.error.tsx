import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

interface Props {
  readonly children: Readonly<Error>;
  readonly onRetryClick: () => void;
}

export default function LoadMetadataError({
  children,
  onRetryClick,
}: Props): ReactElement {
  return (
    <Container
      disableContentPaddings
      header={<Header variant="h1">MTGeni.us Collection</Header>}
    >
      <Box padding="m">
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
          {children.message}
        </Alert>
      </Box>
    </Container>
  );
}
