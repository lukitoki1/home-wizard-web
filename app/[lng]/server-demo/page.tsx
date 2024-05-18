import { Stack } from '@mantine/core';
import useST from '@/lib/i18n/server';
import { PageParams } from '@/lib/types/params';
import { getLngPath } from '@/lib/i18n/utils';
import LinkButton from '@/components/LinkButton/LinkButton';

export default async function Page({ params: { lng } }: PageParams) {
  const { t } = await useST(lng, 'server-demo');

  return (
    <Stack align="center" mt="xl">
      <h1>{t('title')}</h1>
      <LinkButton href={getLngPath(lng, '/')}>{t('home')}</LinkButton>
    </Stack>
  );
}
