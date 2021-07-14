import type { CardsProps } from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import ScryfallImage from '../../components/scryfall-image';
import type MagicCard from '../../types/magic-card';
import styles from './cards-cards.constant.card-definition.module.scss';

const CARD_DEFINITION: CardsProps.CardDefinition<MagicCard> = {
  header({ cardName, scryfallId }: MagicCard): ReactElement {
    return (
      <ScryfallImage alt={cardName} className={styles.image} image="small">
        {scryfallId}
      </ScryfallImage>
    );
  },
};

export default CARD_DEFINITION;
