import '@awsui/global-styles/index.css';
import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { StrictMode } from 'react';
import CardCollection from '../../components/card-collection';
import LoadCards from '../../components/load-cards';
import LoadMetadata from '../../components/load-metadata';
import Wrapper from '../../components/wrapper';
import TRANSLATIONS from '../../constants/translations';
import type MetadataType from '../../types/metadata';
import useApp from './app.hook';
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
  const { locale } = useApp();

  return (
    <StrictMode>
      <AwsuiDarkMode root="body">
        <I18nProvider
          fallbackLocale="en"
          locale={locale}
          translations={TRANSLATIONS}
        >
          <Wrapper>
            <LoadMetadata fetchMetadata={fetchMetadata}>
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
                <LoadCards
                  Component={CardCollection}
                  cardNamesSize={cardNamesSize}
                  fetchCardNames={fetchCardNames}
                  fetchScryfallIds={fetchScryfallIds}
                  fetchSetCodes={fetchSetCodes}
                  fetchSetNames={fetchSetNames}
                  lastUpdated={date}
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
              )}
            </LoadMetadata>
          </Wrapper>
        </I18nProvider>
      </AwsuiDarkMode>
    </StrictMode>
  );
}
