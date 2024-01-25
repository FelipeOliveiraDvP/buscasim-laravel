import { Group, ScrollArea, rem } from '@mantine/core';
import {
  IconGauge,
  IconUserDollar,
  IconCalendarMonth,
  IconLayoutKanban,
  IconGavel,
  IconUsers,
  IconSettings,
  IconTicket,
  IconNote,
} from '@tabler/icons-react';
import { Logo } from '../Logo';
import { MenuItem } from '../Item';
import { UserInfo } from '../UserInfo';
import classes from './styles.module.css';

const menuItems = [
  { label: 'Pedidos', link: '/app', icon: IconNote },
  { label: 'Cupons', link: '/app/cupons', icon: IconTicket },
  { label: 'Configurações', link: '/app/configuracoes', icon: IconSettings },
  { label: 'Usuários', link: '/app/usuarios', icon: IconUsers },
];

export function Menu() {
  const links = menuItems.map((item) => (
    <MenuItem {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserInfo />
      </div>
    </nav>
  );
}
