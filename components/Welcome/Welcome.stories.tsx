import { Meta } from '@storybook/react';
import { Welcome } from './Welcome';
import { buildMeta } from '@/lib/storybook/utils';

type PagePropsAndCustomArgs = React.ComponentProps<typeof Welcome> & { lng: 'en' | 'de' };

const meta: Meta<PagePropsAndCustomArgs> = {
  ...buildMeta({
    component: Welcome,
    render: ({ lng }) => <Welcome lng={lng} />,
  }),
};

export default meta;

export async function DefaultEN() {
  return <Welcome lng="en" />;
}

export async function DefaultDE() {
  return <Welcome lng="de" />;
}
