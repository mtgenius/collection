import SpaceBetween from '@awsui/components-react/space-between';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Header from '../../components/header';
import Wrapper from '../../components/wrapper';

export default function MetadataLoading(): ReactElement {
  return (
    <Wrapper
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xxs">
              <Spinner />
              <span>
                <I18n>Loading metadata</I18n>
              </span>
            </SpaceBetween>
          }
        />
      }
    />
  );
}
