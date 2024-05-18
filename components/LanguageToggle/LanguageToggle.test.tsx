import { screen } from '@testing-library/react';
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle';
import { render } from '@/lib/test/render';

jest.mock('@/lib/i18n/client', () => ({
  useCT: jest.fn(() => ({ t: (key: string) => key })),
  useLanguage: jest.fn((lng: string | undefined) => ({
    lng,
    switchLng: jest.fn(),
  })),
}));

describe('LanguageToggle component', () => {
  it('has correct text', () => {
    render(<LanguageToggle lng="en" />);

    expect(screen.getAllByLabelText('language')).toBeDefined();
  });
});
