import { Anchor, AnchorProps } from "@mantine/core";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

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
