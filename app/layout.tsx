import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { headers } from 'next/headers';
import { theme } from '@/theme';
import { urlHeaderName } from '@/lib/values/headers';
import { getLngFromURL } from '@/lib/i18n/utils';

export default function RootLayout({ children }: { children: any }) {
  const url = headers().get(urlHeaderName);

  const lng = getLngFromURL(url);

  return (
    <html lang={lng}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
