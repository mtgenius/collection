import type { ReactElement } from 'react';
import { StrictMode } from 'react';
import Main from '../../components/main';
import type MetaData from '../../types/meta-data';
import './app.module.scss';

interface Props {
  readonly fetchMetaData: () => Promise<MetaData>;
}

export default function App({ fetchMetaData }: Props): ReactElement {
  return (
    <StrictMode>
      <Main fetchMetaData={fetchMetaData} />
    </StrictMode>
  );
}
