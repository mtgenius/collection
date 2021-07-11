import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { StrictMode, useState } from 'react';
import Main from '../../components/main';
import Locale from '../../constants/locale';
import TRANSLATIONS from '../../constants/translations';
import type MetaData from '../../types/meta-data';
import './app.scss';

interface Props {
  readonly fetchMetaData: () => Promise<MetaData>;
}

export default function App({ fetchMetaData }: Props): ReactElement {
  const [locale, setLocale] = useState(Locale.English);

  return (
    <StrictMode>
      <I18nProvider
        fallbackLocale="en"
        locale={locale}
        translations={TRANSLATIONS}
      >
        <Main fetchMetaData={fetchMetaData} onLocaleChange={setLocale} />
      </I18nProvider>
    </StrictMode>
  );
}
