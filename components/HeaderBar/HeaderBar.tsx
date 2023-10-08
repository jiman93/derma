import {
  Header,
  Group,
  Menu,
  ActionIcon,
  Box,
  Burger,
  Drawer,
  Grid,
  Button,
  Text,
  Space,
  Checkbox,
  Paper,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookQuran,
  faCircleInfo,
  faGear,
  faPaperPlane,
  faPenRuler,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import useStyles from './Header.styles';

const HeaderBar = () => {
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [settingDrawerOpened, setSettingDrawerOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <Header height={50} p="xs">
      <Grid className={classes.header}>
        <Grid.Col span={10}>
          <Box sx={{ display: 'flex' }}>
            <Burger opened={sidebarOpened} onClick={() => setSidebarOpened((o) => !o)} />
            <Group spacing={50} ml={100}>
              <Link href="/">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  Listing
                </Button>
              </Link>
              <Link href="/masjid">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPenRuler} />}
                  variant="subtle"
                  color="gray"
                >
                  Masjid
                </Button>
              </Link>
              <Link href="/poster">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPenRuler} />}
                  variant="subtle"
                  color="gray"
                >
                  Poster
                </Button>
              </Link>
              <Link href="/user">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  User
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faCircleInfo} />}
                  variant="subtle"
                  color="gray"
                >
                  Help
                </Button>
              </Link>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={2} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Group spacing="sm" pr="md">
            <Button onClick={() => setSettingDrawerOpened(true)} pr="md" variant="light">
              Primary
              {/* <FontAwesomeIcon icon={faGear} size="lg" /> */}
            </Button>

            {/* <Menu onClose={() => setUserMenuOpened(false)} onOpen={() => setUserMenuOpened(true)}>
              <Menu.Target>
                <ActionIcon radius="lg">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>User Profile</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </Group>
        </Grid.Col>
      </Grid>
      <Drawer
        opened={settingDrawerOpened}
        onClose={() => setSettingDrawerOpened(false)}
        position="right"
        title={
          <Text color="gray.6" weight={700}>
            Settings
          </Text>
        }
        padding="sm"
      >
        <Text>Translation</Text>
        <Paper m="xs">
          <Space h="xs" />
          <Text size="xs" weight={700}>
            By Verse
          </Text>
          <Box>
            <Checkbox label="Show verse note" p="xxs" />
            <Checkbox label="Show tags and links" p="xxs" />
            <Paper shadow="xs" mt="xxs" p="xs" sx={{ backgroundColor: theme.colors.gray[8] }}>
              <Text size="xs" color="gray.5">
                Selected Translations
              </Text>
              <Text weight="bold">Muhammad Asad</Text>
            </Paper>
          </Box>
          <Space h="xs" />
          <Text size="xs" weight={700}>
            By Word
          </Text>
          <Box>
            <Checkbox label="Show verse note" p="xxs" />
            <Checkbox label="Show tags and links" p="xxs" />
            <Paper shadow="xs" mt="xxs" p="xs" sx={{ backgroundColor: theme.colors.gray[8] }}>
              <Text size="xs" color="gray.5">
                Selected Translations
              </Text>
              <Text weight="bold">Sahih International</Text>
            </Paper>
          </Box>
        </Paper>
      </Drawer>
    </Header>
  );
};

export default HeaderBar;
