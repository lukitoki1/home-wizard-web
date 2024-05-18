'use client';

import { Select } from '@mantine/core';
import { languages } from '@/lib/i18n/settings';
import { LngParams } from '@/lib/i18n/types';
import { changeLanguage } from '@/components/LanguageToggle/actions';
import { useCT } from '@/lib/i18n/client';

interface Params extends LngParams {}

export function LanguageToggle({ lng: oldLng }: Params) {
  const { t } = useCT(oldLng);

  async function changeLng(newLng: string | null) {
    await changeLanguage(oldLng, newLng);
  }

  return (
    <form>
      <Select
        mt={50}
        label={t('language')}
        maw={300}
        mx="auto"
        data={languages}
        value={oldLng}
        onChange={changeLng}
      />
    </form>
  );
}
