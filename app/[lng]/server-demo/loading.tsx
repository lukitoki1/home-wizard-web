import { Loader, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <Stack align="center" h="100px" justify="center" mt="xl">
      <Loader />
    </Stack>
  );
}
