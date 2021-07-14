import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

interface Props {
  readonly onClearFilter: () => void;
}

export default function CardsCardsEmpty({
  onClearFilter,
}: Props): ReactElement {
  return (
    <SpaceBetween direction="vertical" size="m">
      <Box variant="p">
        <I18n>No cards matched your filter.</I18n>
      </Box>
      <Button onClick={onClearFilter}>
        <I18n>Clear filter</I18n>
      </Button>
    </SpaceBetween>
  );
}
