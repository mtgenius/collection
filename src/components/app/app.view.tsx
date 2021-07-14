import '@awsui/global-styles/index.css';
import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { StrictMode, useState } from 'react';
import CardsCards from '../../components/cards-cards';
import Header from '../../components/header';
import LoadCards from '../../components/load-cards';
import Metadata from '../../components/metadata';
import Wrapper from '../../components/wrapper';
import Locale from '../../constants/locale';
import TRANSLATIONS from '../../constants/translations';
import type MetadataType from '../../types/metadata';
import './app.scss';

interface Props {
  readonly fetchCardNames: () => Promise<string[]>;
  readonly fetchMetadata: () => Promise<MetadataType>;
  readonly fetchScryfallIds: () => Promise<Record<string, string>>;
  readonly fetchSetCodes: () => Promise<string[]>;
  readonly fetchSetNames: () => Promise<string[]>;
  readonly fetchSetIndexCardIndexMultiverseIds: () => Promise<
    Record<number | string, Record<number | string, number>>
  >;
}

export default function App({
  fetchCardNames,
  fetchMetadata,
  fetchScryfallIds,
  fetchSetCodes,
  fetchSetIndexCardIndexMultiverseIds,
  fetchSetNames,
}: Props): ReactElement {
  const [locale] = useState(Locale.English);

  return (
    <StrictMode>
      <AwsuiDarkMode root="body">
        <I18nProvider
          fallbackLocale="en"
          locale={locale}
          translations={TRANSLATIONS}
        >
          <Metadata fetchMetadata={fetchMetadata}>
            {({
              // cardKingdomIdsSize,
              cardNamesSize,
              date,
              scryfallIdsSize,
              setCodesSize,
              setIndexCardIndexMultiverseIdsSize,
              setNamesSize,
            }: // tcgplayerProductIdsSize,
            MetadataType): ReactElement => (
              <Wrapper header={<Header lastUpdated={date} />}>
                <LoadCards
                  Component={CardsCards}
                  cardNamesSize={cardNamesSize}
                  fetchCardNames={fetchCardNames}
                  fetchScryfallIds={fetchScryfallIds}
                  fetchSetCodes={fetchSetCodes}
                  fetchSetNames={fetchSetNames}
                  scryfallIdsSize={scryfallIdsSize}
                  setCodesSize={setCodesSize}
                  setNamesSize={setNamesSize}
                  fetchSetIndexCardIndexMultiverseIds={
                    fetchSetIndexCardIndexMultiverseIds
                  }
                  setIndexCardIndexMultiverseIdsSize={
                    setIndexCardIndexMultiverseIdsSize
                  }
                />
              </Wrapper>
            )}
          </Metadata>
        </I18nProvider>
      </AwsuiDarkMode>
    </StrictMode>
  );
}
