import { AppShell, Drawer, Transition } from '@mantine/core';
import Sidebar from '../Sidebar';
import { useState } from 'react';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HeaderBar from '../HeaderBar/HeaderBar';
import { useColorScheme } from '@mantine/hooks';

config.autoAddCss = false; /* eslint-disable import/first */

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }) => {
  const [openedBurger, setOpenedBurger] = useState(false);
  const colorScheme = useColorScheme();

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);

  return (
    <AppShell
      header={{ height: 50 }}
      styles={(theme) => ({
        main: {
          backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <AppShell.Header>
        <HeaderBar />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Transition mounted={sidebarOpened} transition="slide-right" timingFunction="ease">
          {(styles) => (
            <div style={styles}>
              <Sidebar />
            </div>
          )}
        </Transition>
      </AppShell.Navbar>

      <AppShell.Main>
        <Drawer
          opened={openedBurger}
          onClose={() => setOpenedBurger(false)}
          title="Stuffs"
          padding="md"
        >
          List of stuffs
        </Drawer>
        <div>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};
