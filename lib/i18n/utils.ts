import { fallbackLanguage } from '@/lib/i18n/settings';

export function lngPath(lng: string = fallbackLanguage, path: string = '') {
  return `/${lng}${path}`;
}

export function getLngFromURL(url: string | null): string {
  if (!url) {
    return fallbackLanguage;
  }

  const results = /^.*\/\/[a-zA-Z0-9:]*\/(?<lng>[a-z]{2}).*/.exec(url);

  return results?.groups?.lng || fallbackLanguage;
}
