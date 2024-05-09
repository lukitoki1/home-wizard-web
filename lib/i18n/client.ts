'use client';

import i18next, { FlatNamespace, i18n, KeyPrefix } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useCookies } from 'react-cookie';
import { FallbackNs, initReactI18next, useTranslation, UseTranslationOptions } from 'react-i18next';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isServer } from '../utils/isServer';
import { cookieName, getLocalesPath, getOptions, languages } from './settings';
import { logger } from '@/lib/logger';
import { LngParams } from '@/lib/types/params';
import { lngPath } from '@/lib/i18n/utils';

// on the client side normal singleton is ok
i18next
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
export default function useCT<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: string, ns?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const i18nPackage = useTranslation(ns, options);
  const i18nInstance = i18nPackage.i18n;

  if (isServer && lng !== i18nInstance.resolvedLanguage) {
    i18nInstance.changeLanguage(lng);
  }

  return i18nPackage;
}

export function useLanguage(i18nInstance: i18n) {
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
