import { render } from 'react-dom';
import App from './components/app';
import fetchCardNames from './utils/fetch-card-names';
import fetchMetadata from './utils/fetch-metadata';
import fetchSetCodes from './utils/fetch-set-codes';
import fetchSetIndexCardIndexMultiverseIds from './utils/fetch-set-index-card-index-multiverse-ids';
import fetchSetNames from './utils/fetch-set-names';

render(
  <App
    fetchCardNames={fetchCardNames}
    fetchMetadata={fetchMetadata}
    fetchSetCodes={fetchSetCodes}
    fetchSetIndexCardIndexMultiverseIds={fetchSetIndexCardIndexMultiverseIds}
    fetchSetNames={fetchSetNames}
  />,
  document.getElementById('root'),
);
