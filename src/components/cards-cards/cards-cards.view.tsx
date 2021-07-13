import type { CardsProps } from '@awsui/components-react/cards';
import Cards from '@awsui/components-react/cards';
import type { ReactElement } from 'react';
import type MagicCard from '../../types/magic-card';

interface Props {
  readonly children: readonly Readonly<MagicCard>[];
}

const CARD_DEFINITION: CardsProps.CardDefinition<MagicCard> = {
  header(): string {
    return 'Magic Card';
  },
  sections: [
    {
      id: 'test',
      header(): string {
        return 'test';
      },
      content(): string {
        return 'content';
      },
    },
  ],
};

const START = 0;
const END = 10;

export default function CardsCards({ children }: Props): ReactElement {
  return (
    <Cards
      cardDefinition={CARD_DEFINITION}
      items={children.slice(START, END)}
    />
  );
}
