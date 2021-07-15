import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import type MagicCard from '../../types/magic-card';
import useLoadCards from './load-cards.hook';
import mapErrorToListItem from './load-cards.util.map-error-to-list-item';

interface ComponentProps {
  readonly children: readonly MagicCard[];
  readonly lastUpdated: string;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly Component: ComponentType<ComponentProps>;
  readonly cardNamesSize: number;
  readonly fetchCardNames: () => Promise<string[]>;
  readonly fetchScryfallIds: () => Promise<Record<string, string>>;
  readonly fetchSetCodes: () => Promise<string[]>;
  readonly fetchSetNames: () => Promise<string[]>;
  readonly lastUpdated: string;
  readonly scryfallIdsSize: number;
  readonly setCodesSize: number;
  readonly setIndexCardIndexMultiverseIdsSize: number;
  readonly setNamesSize: number;
  readonly fetchSetIndexCardIndexMultiverseIds: () => Promise<
    Record<number | string, Record<number | string, number>>
  >;
}

const FIRST = 0;
const NONE = 0;
const SINGLE = 1;

export default function LoadCards({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  cardNamesSize,
  fetchCardNames,
  fetchScryfallIds,
  fetchSetCodes,
  fetchSetIndexCardIndexMultiverseIds,
  fetchSetNames,
  lastUpdated,
  scryfallIdsSize,
  setCodesSize,
  setIndexCardIndexMultiverseIdsSize,
  setNamesSize,
}: Props): ReactElement {
  const { bytesLoaded, bytesTotal, cards, errors, handleRetryClick } =
    useLoadCards({
      cardNamesSize,
      fetchCardNames,
      fetchScryfallIds,
      fetchSetCodes,
      fetchSetIndexCardIndexMultiverseIds,
      fetchSetNames,
      scryfallIdsSize,
      setCodesSize,
      setIndexCardIndexMultiverseIdsSize,
      setNamesSize,
    });

  if (errors.length > NONE) {
    return (
      <Alert
        buttonText={<I18n>Retry</I18n>}
        dismissible={false}
        onButtonClick={handleRetryClick}
        type="error"
        visible
        header={
          errors.length !== SINGLE ? (
            <I18n>There were errors loading the card data.</I18n>
          ) : (
            <I18n>There was an error loading the card data.</I18n>
          )
        }
      >
        {errors.length !== SINGLE ? (
          <ul>{errors.map(mapErrorToListItem)}</ul>
        ) : (
          <>{errors[FIRST].message}</>
        )}
      </Alert>
    );
  }

  if (bytesLoaded < bytesTotal) {
    return (
      <Box>
        Loaded {bytesLoaded} of {bytesTotal} bytes
      </Box>
    );
  }

  return <Component lastUpdated={lastUpdated}>{cards}</Component>;
}
