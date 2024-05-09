import { Text, Title } from '@mantine/core';
import useST from '@/lib/i18n/server';
import { LngParams } from '@/lib/types/params';
import classes from './Welcome.module.css';

type Attrs = LngParams;

export async function Welcome({ lng }: Attrs) {
  const { t } = await useST(lng, 'welcome');

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        {t('title')}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          {t('appName')}
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        {t('description')}
      </Text>
    </>
  );
}
