import Box from '@awsui/components-react/box';
import Cards from '@awsui/components-react/cards';
import TextFilter from '@awsui/components-react/text-filter';
import type { ReactElement } from 'react';
import Pagination from '../../components/pagination';
import type MagicCard from '../../types/magic-card';
import useCardsCards from './cards-cards.hook';
import Empty from './cards-cards.view.empty';
import Header from './cards-cards.view.header';

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
        header={<Header onExport={handleExport} />}
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
