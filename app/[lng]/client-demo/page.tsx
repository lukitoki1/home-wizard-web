'use client';

import { Button, Stack, Text, Title } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import useCT from '@/lib/i18n/client';
import { PageParams } from '@/lib/types/params';
import { lngPath } from '@/lib/i18n/utils';
import LinkButton from '@/components/LinkButton/LinkButton';

export default function Page({ params: { lng } }: PageParams) {
  const { t } = useCT(lng, 'client-demo');
  const [count, handlers] = useCounter(0, {
    min: 0,
    max: 10,
  });
  return (
    <Stack align="center" mt="xl">
      <Title>{t('title')}</Title>
      <Text
        size="5rem"
        variant="gradient"
        mt="xl"
        mb="xl"
        gradient={{
          from: 'pink',
          to: 'yellow',
        }}
      >
        {t('counter', { count })}
      </Text>
      <Button.Group>
        <Button size="lg" onClick={handlers.decrement}>
          <IconMinus />
        </Button>
        <Button size="lg" onClick={handlers.increment}>
          <IconPlus />
        </Button>
      </Button.Group>
      <LinkButton href={lngPath(lng, '/')}>{t('home')}</LinkButton>
    </Stack>
  );
}
