import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import Header from '@awsui/components-react/header';
import TextFilter from '@awsui/components-react/text-filter';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Pagination from '../../components/pagination';
import type MagicCard from '../../types/magic-card';
import useCardsCards from './cards-cards.hook';
import Empty from './cards-cards.view.empty';

interface Props {
  readonly children: readonly Readonly<MagicCard>[];
}

const isItemDisabled = (): true => true;

export default function CardsCards({ children: cards }: Props): ReactElement {
  const {
    cardDefinition,
    currentPageIndex,
    filteringPlaceholder,
    filteringText,
    handleClearFilter,
    handleExport,
    handlePaginationChange,
    handleTextFilterChange,
    items,
    pagesCount,
    selectedItems,
  } = useCardsCards(cards);

  return (
    <Box margin="l">
      <Cards
        cardDefinition={cardDefinition}
        empty={<Empty onClearFilter={handleClearFilter} />}
        isItemDisabled={isItemDisabled}
        items={items}
        selectedItems={selectedItems}
        selectionType="multi"
        stickyHeader
        trackBy="multiverseId"
        filter={
          <TextFilter
            filteringPlaceholder={filteringPlaceholder}
            filteringText={filteringText}
            onChange={handleTextFilterChange}
          />
        }
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button>
                  <I18n>Import</I18n>
                </Button>
                <Button onClick={handleExport} variant="primary">
                  <I18n>Export</I18n>
                </Button>
              </SpaceBetween>
            }
          >
            <I18n>Cards</I18n>
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={handlePaginationChange}
            pagesCount={pagesCount}
          />
        }
      />
    </Box>
  );
}
