'use client';

import i18nSingleton, { FlatNamespace, i18n as i18nInstanceType, KeyPrefix } from 'i18next';
import { FallbackNs, initReactI18next, useTranslation, UseTranslationOptions } from 'react-i18next';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useCookies } from 'react-cookie';
import { isServer } from '../utils/isServer';
import { cookieName, fallbackLanguage, getLocalesPath, getOptions, languages } from './settings';
import { logger } from '@/lib/logger';
import { LngParams } from '@/lib/i18n/types';
import { lngPath } from '@/lib/i18n/utils';

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

export const useParamsLanguage = (): string | undefined => {
  const params = useParams<LngParams>();

  const { lng } = params;

  logger.info(`useParams logger lng is ${lng}`);

  return lng;
};

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

export function useLanguage(i18nInstance: i18nInstanceType) {
  const [, setCookie] = useCookies([cookieName]);

  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const lng = useParamsLanguage();

  const [activeLng, setActiveLng] = useState(lng);

  useEffect(() => {
    logger.info(`setActiveLng to ${lng}`);

    setActiveLng(lng);
  }, [lng]);

  useEffect(() => {
    logger.info(`changing i18n language to ${lng}`);

    i18nInstance.changeLanguage(lng);

    logger.info(`setting cookie ${cookieName} value to ${lng}`);

    setCookie(cookieName, lng, {
      path: '/',
      sameSite: 'lax',
    });
  }, [activeLng]);

  function switchLng(newLng: string | null) {
    if (newLng == null || lng == null || newLng === lng) {
      return;
    }

    logger.info(`switching client lng to ${lng}`);

    if (!languages.some((supportedLng) => newLng === supportedLng)) {
      logger.warn(`language code ${newLng} is not supported - aborting language switch`);
      return;
    }

    let link = pathname.replace(lngPath(lng), lngPath(newLng));

    const params = searchParams.toString();

    if (params) {
      link = `${link}?${params}`;
    }

    replace(link);
  }

  return {
    lng,
    switchLng,
  };
}
