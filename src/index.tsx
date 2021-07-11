import { render } from 'react-dom';
import App from './components/app';
import fetchMetaData from './utils/fetch-meta-data';

render(<App fetchMetaData={fetchMetaData} />, document.getElementById('root'));
