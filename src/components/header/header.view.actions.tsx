import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import ColumnLayout from '@awsui/components-react/column-layout';
import I18n from 'lazy-i18n';
import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children?: ReactNode;
  readonly lastUpdated?: string;
}

const TEXT_LABEL_MARGIN: BoxProps.Spacing = {
  bottom: 'xxxs',
};

export default function HeaderActions({
  children,
  lastUpdated,
}: Props): ReactElement | null {
  if (typeof children === 'object' && children !== null) {
    return <>{children}</>;
  }

  if (typeof lastUpdated === 'undefined') {
    return null;
  }

  return (
    <ColumnLayout variant="text-grid">
      <div>
        <Box color="text-label" display="inline" margin={TEXT_LABEL_MARGIN}>
          <I18n>Last updated</I18n>:
        </Box>{' '}
        {lastUpdated}
      </div>
    </ColumnLayout>
  );
}
