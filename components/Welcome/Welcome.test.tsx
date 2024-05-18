import { screen } from '@testing-library/react';
import { Welcome } from './Welcome';
import { renderRSC } from '@/lib/test/render';

describe('Welcome component', () => {
  it('has correct text in EN', async () => {
    await renderRSC(Welcome, { lng: 'en' });

    expect(screen.getByText('Welcome to')).toBeDefined();
    expect(screen.queryByText('notExistentText')).toBeNull();
  });
});
