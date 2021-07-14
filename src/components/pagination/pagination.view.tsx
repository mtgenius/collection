import type { NonCancelableCustomEvent } from '@awsui/components-react';
import type { PaginationProps } from '@awsui/components-react/pagination';
import AwsuiPagination from '@awsui/components-react/pagination';
import type { ReactElement } from 'react';
import usePagination from './pagination.hook';

interface Props {
  readonly currentPageIndex: number;
  readonly pagesCount: number;
  readonly onChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ) => void;
}

export default function Pagination({
  currentPageIndex,
  onChange,
  pagesCount,
}: Props): ReactElement {
  const { ariaLabels } = usePagination();

  return (
    <AwsuiPagination
      ariaLabels={ariaLabels}
      currentPageIndex={currentPageIndex}
      onChange={onChange}
      pagesCount={pagesCount}
    />
  );
}
