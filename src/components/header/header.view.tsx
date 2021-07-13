import Container from '@awsui/components-react/container';
import AwsuiHeader from '@awsui/components-react/header';
import type { ReactElement, ReactNode } from 'react';
import Actions from './header.view.actions';

interface Props {
  readonly actions?: ReactNode;
  readonly lastUpdated?: string;
}

export default function Header({ actions, lastUpdated }: Props): ReactElement {
  return (
    <Container
      disableContentPaddings
      header={
        <AwsuiHeader
          actions={<Actions lastUpdated={lastUpdated}>{actions}</Actions>}
          variant="h1"
        >
          MTGeni.us Collection
        </AwsuiHeader>
      }
    />
  );
}
