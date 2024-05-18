'use client';

import { Select } from '@mantine/core';
import { languages } from '@/lib/i18n/settings';
import { useCT, useLanguage } from '@/lib/i18n/client';
import { LngParams } from '@/lib/i18n/types';
import { logger } from '@/lib/logger';
import { isServer } from '@/lib/utils/isServer';

interface Params extends LngParams {}

export const LanguageToggle = ({ lng: serverLng }: Params) => {
  const { i18n, t } = useCT(serverLng);
  const { lng, switchLng } = useLanguage(i18n);

  logger.info(
    `translation is: ${t('language')}, server is ${isServer}, serverLng is ${serverLng}, lng is ${lng}`
  );

  return (
    <Select
      mt={50}
      label={t('language')}
      maw={300}
      mx="auto"
      data={languages}
      value={lng}
      onChange={switchLng}
    />
  );
};
