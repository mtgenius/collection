import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import Header from '@awsui/components-react/header';
import Pagination from '@awsui/components-react/pagination';
import TextFilter from '@awsui/components-react/text-filter';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import type MagicCard from '../../types/magic-card';
import CARD_DEFINITION from './cards-cards.constant.card-definition';
import useCardsCards from './cards-cards.hook';

interface Props {
  readonly children: readonly Readonly<MagicCard>[];
}

const START = 0;
const END = 10;

export default function CardsCards({ children }: Props): ReactElement {
  const { selectedItems } = useCardsCards();

  return (
    <Box margin="l">
      <Cards
        cardDefinition={CARD_DEFINITION}
        items={children.slice(START, END)}
        filter={<TextFilter filteringText="test" />}
        pagination={<Pagination currentPageIndex={START} pagesCount={END} />}
        selectedItems={selectedItems}
        selectionType="multi"
        trackBy="multiverseId"
        empty={<>No cards matched your search.</>}
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button>
                  <I18n>Import</I18n>
                </Button>
                <Button variant="primary">
                  <I18n>Export</I18n>
                </Button>
              </SpaceBetween>
            }
          >
            <I18n>Cards</I18n>
          </Header>
        }
      />
    </Box>
  );
}
