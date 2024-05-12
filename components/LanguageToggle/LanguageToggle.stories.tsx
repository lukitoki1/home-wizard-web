import { StoryObj } from '@storybook/react';
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle';
import { buildMeta } from '@/lib/storybook/utils';

export default {
  ...buildMeta({ component: LanguageToggle }),
};

export const Default: StoryObj<typeof LanguageToggle> = {};
