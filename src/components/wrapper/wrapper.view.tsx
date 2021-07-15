import AppLayout from '@awsui/components-react/app-layout';
import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children?: ReactNode;
}

export default function Wrapper({ children }: Props): ReactElement {
  return (
    <AppLayout
      content={children}
      contentType="cards"
      navigationHide
      toolsHide
    />
  );
}
