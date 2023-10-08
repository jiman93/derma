import {
  AppShell,
  Header,
  Group,
  Code,
  Center,
  Menu,
  Avatar,
  UnstyledButton,
  ActionIcon,
  Box,
  SegmentedControl,
  Burger,
  Drawer,
  Transition,
  Anchor,
  Text,
  Grid,
  Button,
} from '@mantine/core';
import Sidebar from '../Sidebar';
import useStyles from './Layout.styles';

import { useState } from 'react';
import Link from 'next/link';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookAtlas,
  faBookBible,
  faBookQuran,
  faCircleInfo,
  faGear,
  faMoon,
  faPaperPlane,
  faPenRuler,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import HeaderBar from '../HeaderBar/HeaderBar';

config.autoAddCss = false; /* eslint-disable import/first */

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }) => {
  const { classes } = useStyles();
  const [openedBurger, setOpenedBurger] = useState(false);

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);

  return (
    <AppShell
      fixed
      navbar={
        <Transition mounted={sidebarOpened} transition="slide-right" timingFunction="ease">
          {(styles) => (
            <div style={styles}>
              <Sidebar />
            </div>
          )}
        </Transition>
      }
      navbarOffsetBreakpoint="sm"
      header={<HeaderBar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <>
        <Drawer
          opened={openedBurger}
          onClose={() => setOpenedBurger(false)}
          title="Stuffs"
          padding="md"
        >
          List of stuffs
        </Drawer>
        <div>{children}</div>
      </>
    </AppShell>
  );
};
