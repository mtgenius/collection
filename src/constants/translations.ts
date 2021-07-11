import type { Translations } from 'lazy-i18n';
import Locale from '../constants/locale';
import en from '../translations/en.json';

const TRANSLATIONS: Record<Locale, Translations | undefined> = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  [Locale.English]: en as unknown as Record<string, string>,
};

export default TRANSLATIONS;
