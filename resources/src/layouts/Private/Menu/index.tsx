import { Group, ScrollArea, rem } from '@mantine/core';
import {
  IconGauge,
  IconUserDollar,
  IconCalendarMonth,
  IconLayoutKanban,
  IconGavel,
  IconUsers,
} from '@tabler/icons-react';
import { Logo } from '../Logo';
import { MenuItem } from '../Item';
import { UserInfo } from '../UserInfo';
import classes from './styles.module.css';

const menuItems = [
  { label: 'Dashboard', link: '/app', icon: IconGauge },
  {
    label: 'Clientes',
    link: '/app/customers',
    icon: IconUserDollar,
  },
  {
    label: 'Agenda',
    link: '/app/scheduler',
    icon: IconCalendarMonth,
  },
  { label: 'Tarefas', link: '/app/tasks', icon: IconLayoutKanban },
  { label: 'Processos', link: '/app/processes', icon: IconGavel },
  {
    label: 'Usuários',
    link: '/app/users',
    icon: IconUsers,
  },
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
