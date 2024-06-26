import { Group } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';
import useST from '@/lib/i18n/server';
import { PageParams } from '@/lib/types/params';
import LinkButton from '@/components/LinkButton/LinkButton';
import { getLngPath } from '@/lib/i18n/utils';

export default async function Page({ params: { lng } }: PageParams) {
  const { t } = await useST(lng);

  return (
    <div>
      <Welcome lng={lng} />
      <ColorSchemeToggle />
      <Group justify="center" mt="xl">
        <LinkButton href={getLngPath(lng, '/server-demo')}>{t('toServerDemo')}</LinkButton>
        <LinkButton href={getLngPath(lng, '/client-demo')}>{t('toClientDemo')}</LinkButton>
      </Group>
    </div>
  );
}
