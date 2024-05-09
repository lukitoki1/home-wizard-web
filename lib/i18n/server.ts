import { createInstance, FlatNamespace, KeyPrefix } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { FallbackNs } from 'react-i18next';
import { getOptions, getLocalesPath } from './settings';

const initI18next = async (lng: string, ns: string | string[]) => {
  // on the server side we create a new instance for each render,
  // because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(getLocalesPath))
    .init(getOptions(lng, ns));

  return i18nInstance;
};

/**
 * use server-side translations
 * @param lng language code
 * @param ns translation namespace name
 * @param options
 * @returns server-side awaitable translations object
 */
export default async function useST<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );

  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
