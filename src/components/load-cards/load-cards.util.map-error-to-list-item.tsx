import type { ReactElement } from 'react';

export default function mapErrorToListItem(err: Readonly<Error>): ReactElement {
  return <li key={err.message}>{err.message}</li>;
}
