export const fallbackLanguage = 'en';
export const languages = [fallbackLanguage, 'de'];

export const defaultNamespace = 'translation';
export const cookieName = 'i18next';

export const getLocalesPath = (language: string, namespace: string) =>
  import(`@/lib/i18n/locales/${language}/${namespace}.json`);

export function getOptions(
  language = fallbackLanguage,
  namespace: string | string[] = defaultNamespace,
  debug: boolean = false,
  preload: boolean = false
) {
  return {
    debug,
    supportedLngs: languages,
    preload: preload ? languages : undefined,
    fallbackLng: fallbackLanguage,
    lng: language,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns: namespace,
  };
}
