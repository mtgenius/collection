import type { ReactElement } from 'react';
import { StrictMode, useEffect, useState } from 'react';
import type Meta from '../../types/meta';
import forceMetaIdentity from '../../utils/force-meta-identity';
import mapToDefault from '../../utils/map-to-default';

export default function App(): ReactElement {
  const [error, setError] = useState<Error>();
  const [meta, setMeta] = useState<Meta>();

  useEffect((): void => {
    import('../../data/meta.json')
      .then(mapToDefault)
      .then(forceMetaIdentity)
      .then(setMeta)
      .catch(setError);
  }, []);

  if (error) {
    console.error(error);
  }

  if (typeof meta === 'undefined') {
    return <>Loading...</>;
  }

  return (
    <StrictMode>
      <div>Last updated: {meta.date}</div>
    </StrictMode>
  );
}
