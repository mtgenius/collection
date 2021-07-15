import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

export default function LoadMetadataLoading(): ReactElement {
  return (
    <Container
      disableContentPaddings
      header={<Header variant="h1">MTGeni.us Collection</Header>}
    >
      <Box padding="m">
        <SpaceBetween direction="horizontal" size="xxs">
          <Spinner />
          <span>
            <I18n>Loading metadata</I18n>
          </span>
        </SpaceBetween>
      </Box>
    </Container>
  );
}
