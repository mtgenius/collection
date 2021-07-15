import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import ColumnLayout from '@awsui/components-react/column-layout';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

interface Props {
  readonly isExportDisabled: boolean;
  readonly lastUpdated: string;
  readonly onExport: () => void;
}

const TEXT_LABEL_MARGIN: BoxProps.Spacing = {
  bottom: 'xxxs',
};

export default function CardCollectionHeader({
  isExportDisabled,
  lastUpdated,
  onExport,
}: Props): ReactElement {
  return (
    <Header
      actions={
        <SpaceBetween direction="horizontal" size="s">
          <Button>
            <I18n>Import</I18n>
          </Button>
          <Button
            disabled={isExportDisabled}
            onClick={onExport}
            variant="primary"
          >
            <I18n>Export</I18n>
          </Button>
        </SpaceBetween>
      }
      description={
        <ColumnLayout variant="text-grid">
          <div>
            <Box color="text-label" display="inline" margin={TEXT_LABEL_MARGIN}>
              <I18n>Last updated</I18n>:
            </Box>{' '}
            {lastUpdated}
          </div>
        </ColumnLayout>
      }
    >
      MTGeni.us Collection
    </Header>
  );
}
