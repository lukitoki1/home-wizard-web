import Link from 'next/link';
import { Button } from '@mantine/core';

type Props = {
  href: string;
  children?: React.ReactNode;
};

export default function LinkButton({ href, children }: Props) {
  return (
    <Link href={href} passHref>
      <Button variant="outline">{children}</Button>
    </Link>
  );
}
