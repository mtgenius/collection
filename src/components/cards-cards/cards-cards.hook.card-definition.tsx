import Button from '@awsui/components-react/button';
import type { CardsProps } from '@awsui/components-react/cards';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import ScryfallImage from '../../components/scryfall-image';
import type MagicCard from '../../types/magic-card';
import styles from './cards-cards.hook.card-definition.module.scss';

interface Props {
  readonly collection: Readonly<Map<number, number>>;
  readonly onAddToCollection: (multiverseId: number) => void;
  readonly onSubtractFromCollection: (multiverseId: number) => void;
}

const NONE = 0;

export default function useCardDefinition({
  collection,
  onAddToCollection,
  onSubtractFromCollection,
}: Props): CardsProps.CardDefinition<MagicCard> {
  return useMemo(
    (): CardsProps.CardDefinition<MagicCard> => ({
      header({ cardName, scryfallId, setCode }: MagicCard): ReactElement {
        return (
          <ScryfallImage
            alt={cardName}
            className={styles.image}
            image="small"
            title={`${cardName} (${setCode})`}
          >
            {scryfallId}
          </ScryfallImage>
        );
      },
      sections: [
        {
          id: 'add-subtract',
          content({ multiverseId }: MagicCard): ReactElement {
            const count: number = collection.get(multiverseId) ?? NONE;

            return (
              <SpaceBetween direction="horizontal" size="xxxs">
                <Button
                  disabled={count === NONE}
                  onClick={(): void => {
                    onSubtractFromCollection(multiverseId);
                  }}
                >
                  -
                </Button>
                <Input
                  className={styles.count}
                  disableBrowserAutocorrect
                  readOnly
                  value={count.toString()}
                />
                <Button
                  onClick={(): void => {
                    onAddToCollection(multiverseId);
                  }}
                >
                  +
                </Button>
              </SpaceBetween>
            );
          },
        },
      ],
    }),
    [collection, onAddToCollection, onSubtractFromCollection],
  );
}
