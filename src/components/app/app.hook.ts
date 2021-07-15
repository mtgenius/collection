import { useState } from 'react';
import Locale from '../../constants/locale';

interface State {
  readonly locale: Locale;
}

export default function useApp(): State {
  const [locale] = useState(Locale.English);

  return {
    locale,
  };
}
