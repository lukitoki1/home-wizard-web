import { Languages } from '@/lib/i18n/settings';

export type Language = keyof typeof Languages;

export const lngParamName = 'lng';

export type LngParams = {
  [lngParamName]: Language;
};
