import { Container, Group, Burger, Image } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { AnchorLink } from '@/components/__commons';
import classes from './styles.module.css';

import logo from '@/assets/logo.svg';

const links = [
  { link: '/perguntas-frequentes', label: 'Perguntas Frequentes' },
  { link: '/contato', label: 'Contato' },
  { link: '/entrar', label: 'Entrar' },
];

export function PublicHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();

  const items = links.map((link) => (
    <AnchorLink
      key={link.link}
      href={link.link}
      className={classes.link}
      data-active={link.link === location.pathname || undefined}
    >
      {link.label}
    </AnchorLink>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <AnchorLink href="/">
          <Image src={logo} width={100} height={48} />
        </AnchorLink>
        <Group visibleFrom="xs">{items}</Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
