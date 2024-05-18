import { Meta } from '@storybook/react';
import { Welcome } from './Welcome';
import { buildMeta } from '@/lib/storybook/utils';

const meta: Meta<typeof Welcome> = {
  ...buildMeta({
    component: Welcome,
  }),
};

export default meta;

export async function DefaultEN() {
  return <Welcome lng="en" />;
}

export async function DefaultDE() {
  return <Welcome lng="de" />;
}
