'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { logger } from '@/lib/logger';
import { cookieName, languages } from '@/lib/i18n/settings';
import { lngPath } from '@/lib/i18n/utils';
import { urlHeaderName } from '@/lib/values/headers';

export async function changeLanguage(oldLng: string | undefined, newLng: string | null) {
  if (oldLng == null) {
    logger.error('oldLng is null');
    return;
  }

  const url = headers().get(urlHeaderName);

  if (url == null) {
    logger.error('url is null');
    return;
  }

  if (newLng == null) {
    logger.error('lng is null');
    return;
  }

  if (!languages.some((supportedLng) => newLng === supportedLng)) {
    logger.warn(`language code ${newLng} is not supported - aborting language switch`);
    return;
  }

  cookies().set(cookieName, newLng);

  const link = url.replace(lngPath(oldLng), lngPath(newLng));

  logger.info(`changing language to ${newLng}`);
  logger.info(`redirecting to ${link}`);

  redirect(link);
}
