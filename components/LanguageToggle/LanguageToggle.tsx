'use client';

import { Select } from '@mantine/core';
import { languages } from '@/lib/i18n/settings';
import useCT, { useLanguage } from '@/lib/i18n/client';
import { logger } from '@/lib/logger';
import { isServer } from '@/lib/utils/isServer';

type Props = {
  serverLng: string;
};

export const LanguageToggle = ({ serverLng }: Props) => {
  const { i18n, t } = useCT(serverLng);
  const { lng, switchLng } = useLanguage(i18n);

  logger.info(`translation is: ${t('language')}, server is ${isServer}`);

  return (
    <footer style={{ marginTop: 50 }}>
      <Select
        label={t('language')}
        maw={300}
        mx="auto"
        data={languages}
        value={lng}
        onChange={switchLng}
      />
    </footer>
  );
};
