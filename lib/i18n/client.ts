'use client';

import i18nSingleton, { FlatNamespace, KeyPrefix } from 'i18next';
import { FallbackNs, initReactI18next, useTranslation, UseTranslationOptions } from 'react-i18next';
import { useEffect } from 'react';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { isServer } from '../utils/isServer';
import { fallbackLanguage, getLocalesPath, getOptions, languages } from './settings';

i18nSingleton
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(getLocalesPath))
  .init({
    ...getOptions(),
    lng: undefined, // detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: isServer ? languages : [],
  });

/**
 * use client-side translations
 * @param lng language code
 * @param ns translation namespace name
 * @param options
 * @returns client-side translations object
 */
export function useCT<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: string = fallbackLanguage, ns?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const { i18n, t } = useTranslation(ns, options);

  if (isServer && lng !== i18n.resolvedLanguage) {
    i18n.changeLanguage(lng);
  }

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return {
    t,
    i18n,
  };
}
