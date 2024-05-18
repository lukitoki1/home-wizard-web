import { fallbackLanguage } from '@/lib/i18n/settings';

export const lngPath = (lng: string = fallbackLanguage, path: string = '') => `/${lng}${path}`;
