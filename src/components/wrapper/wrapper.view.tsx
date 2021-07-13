import AppLayout from '@awsui/components-react/app-layout';
import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children?: ReactNode;
  readonly contents?: 'cards' | 'default';
  readonly header?: ReactNode;
}

export default function Wrapper({
  children,
  contents = 'default',
  header,
}: Props): ReactElement {
  return (
    <AppLayout
      contentType={contents}
      disableContentPaddings
      navigationHide
      toolsHide
      content={
        <>
          {header}
          {children}
        </>
      }
    />
  );
}
