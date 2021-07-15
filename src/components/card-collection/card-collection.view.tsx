import Cards from '@awsui/components-react/cards';
import TextFilter from '@awsui/components-react/text-filter';
import type { ReactElement } from 'react';
import Pagination from '../../components/pagination';
import type MagicCard from '../../types/magic-card';
import trueFunction from '../../utils/true-function';
import useCardCollection from './card-collection.hook';
import Empty from './card-collection.view.empty';
import Header from './card-collection.view.header';

interface Props {
  readonly children: readonly Readonly<MagicCard>[];
  readonly lastUpdated: string;
}

export default function CardCollection({
  children: cards,
  lastUpdated,
}: Props): ReactElement {
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
  } = useCardCollection(cards);

  return (
    <Cards
      cardDefinition={cardDefinition}
      empty={<Empty onClearFilter={handleClearFilter} />}
      header={<Header lastUpdated={lastUpdated} onExport={handleExport} />}
      isItemDisabled={trueFunction}
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
  );
}
