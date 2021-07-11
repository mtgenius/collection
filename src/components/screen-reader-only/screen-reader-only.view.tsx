import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function ScreenReaderOnly({ children }: Props): ReactElement {
  return <span className="sr-only">{children}</span>;
}
