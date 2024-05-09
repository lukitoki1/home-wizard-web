import { Container } from '@mantine/core';
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle';
import { languages } from '@/lib/i18n/settings';
import { PageParams } from '@/lib/types/params';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: PageParams) {
  return (
    <Container>
      {children}
      <LanguageToggle serverLng={lng} />
    </Container>
  );
}
