import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';

const options = {
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <MantineProvider theme={theme}>{children}</MantineProvider>
  ),
};

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, options);
}

export async function renderRSC<T = {}>(ui: React.FC<T>, props: React.PropsWithChildren<T>) {
  testingLibraryRender(await ui(props), options);
}
