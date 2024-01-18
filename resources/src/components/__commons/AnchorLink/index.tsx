import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, AnchorProps } from '@mantine/core';

interface Props extends AnchorProps {
  href: string;
  children: ReactNode;
}

export function AnchorLink({ href, children, ...props }: Props) {
  return (
    <Anchor {...props} to={href} component={Link}>
      {children}
    </Anchor>
  );
}
