import { Meta } from '@storybook/react';
import { lngParamName } from '@/lib/i18n/types';
import { languages } from '@/lib/i18n/settings';

export function withNavigation<T>(meta: Meta<T>): Meta<T> {
  return {
    ...meta,
    parameters: {
      ...meta.parameters,
      nextjs: {
        appDirectory: true,
      },
    },
  };
}

export function withLng<T>(meta: Meta<T>): Meta<T> {
  return {
    ...meta,
    argTypes: {
      ...meta.argTypes,
      [lngParamName]: {
        options: languages,
      },
    },
  };
}

export function buildMeta<T>(options: Meta<T>): Meta<T> {
  return withNavigation(withLng(options));
}
