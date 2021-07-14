import Button from '@awsui/components-react/button';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

interface Props {
  readonly onExport: () => void;
}

export default function CardsCardsHeader({ onExport }: Props): ReactElement {
  return (
    <Header
      actions={
        <SpaceBetween direction="horizontal" size="s">
          <Button>
            <I18n>Import</I18n>
          </Button>
          <Button onClick={onExport} variant="primary">
            <I18n>Export</I18n>
          </Button>
        </SpaceBetween>
      }
    >
      <I18n>Cards</I18n>
    </Header>
  );
}
