import type { PaginationProps } from '@awsui/components-react/pagination';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

interface State {
  readonly ariaLabels: PaginationProps.Labels;
}

export default function usePagination(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabels: useMemo(
      (): PaginationProps.Labels => ({
        nextPageLabel: translate('Next page'),
        previousPageLabel: translate('Previous page'),
        pageLabel(pageNumber: number): string {
          return translate('Page $n', { n: pageNumber }) ?? '';
        },
      }),
      [translate],
    ),
  };
}
