import {
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
  Flex,
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

const HeaderBar = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [settingDrawerOpened, setSettingDrawerOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <>
      <Grid>
        <Grid.Col span={10}>
          <Flex>
            <Burger opened={sidebarOpened} onClick={() => setSidebarOpened((o) => !o)} />
            <Group gap={50} ml={100}>
              <Link href="/">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  Listing
                </Button>
              </Link>
              <Link href="/masjid/id">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPenRuler} />}
                  variant="subtle"
                  color="gray"
                >
                  Masjid
                </Button>
              </Link>
              <Link href="/poster/id">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPenRuler} />}
                  variant="subtle"
                  color="gray"
                >
                  Poster
                </Button>
              </Link>
              <Link href="/feed/id">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  Feed
                </Button>
              </Link>
              <Link href="/user/id">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  User
                </Button>
              </Link>
              <Link href="/organisation/id">
                <Button
                  leftSection={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  Organisation
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  leftSection={<FontAwesomeIcon icon={faCircleInfo} />}
                  variant="subtle"
                  color="gray"
                >
                  Help
                </Button>
              </Link>
            </Group>
          </Flex>
        </Grid.Col>
        <Grid.Col span={2}>
          <Group pr="md">
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
          <Text color="gray.6" fw={700}>
            Settings
          </Text>
        }
        padding="sm"
      >
        <Text>Translation</Text>
        <Paper m="xs">
          <Space h="xs" />
          <Text size="xs" fw={700}>
            By Verse
          </Text>
          <Box>
            <Checkbox label="Show verse note" p="xxs" />
            <Checkbox label="Show tags and links" p="xxs" />
            <Paper shadow="xs" mt="xxs" p="xs" bg={theme.colors.gray[8]}>
              <Text size="xs" color="gray.5">
                Selected Translations
              </Text>
              <Text fw="bold">Muhammad Asad</Text>
            </Paper>
          </Box>
          <Space h="xs" />
          <Text size="xs" fw={700}>
            By Word
          </Text>
          <Box>
            <Checkbox label="Show verse note" p="xxs" />
            <Checkbox label="Show tags and links" p="xxs" />
            <Paper shadow="xs" mt="xxs" p="xs" bg={theme.colors.gray[8]}>
              <Text size="xs" color="gray.5">
                Selected Translations
              </Text>
              <Text fw="bold">Sahih International</Text>
            </Paper>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default HeaderBar;
