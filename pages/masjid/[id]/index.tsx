import {
  Text,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Table,
  Space,
  Grid,
  Paper,
  List,
  ThemeIcon,
  Avatar,
  Center,
  Tooltip,
  Popover,
  ActionIcon,
  Overlay,
  Modal,
  Progress,
  Box,
  Image,
  ProgressLabel,
  Group,
  Stack,
  Tabs,
  rem,
} from '@mantine/core';

import { useDisclosure, useHover } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';

import { HeroContentLeft } from '../../../components/Hero';
import { MapSearchContext } from '../../../store/contexts/mapSearch';
import { createMockPoster, mockMasjid } from '../../../lib/mock';
import { Masjid } from '../../../definitions/entities';
import dayjs from 'dayjs';
import {
  IconArrowBigDown,
  IconArrowBigDownFilled,
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconChevronDown,
  IconHeartFilled,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHandHoldingDollar, faShare } from '@fortawesome/free-solid-svg-icons';

const Masjid = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  const { selectedData } = useContext(MapSearchContext);
  const [mockData, setMockData] = useState<Masjid>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>{`Follower ${index}`}</p>);

  useEffect(() => {
    if (!mockData) {
      const data = mockMasjid();
      setMockData(data);
    }
  }, []);

  if (!mockData) return <div />;

  console.log(mockData);

  const { followers } = mockData;

  return (
    <Container>
      <HeroContentLeft />

      <Tabs defaultValue="posters">
        <Tabs.List>
          <Tabs.Tab value="posters" leftSection={<IconPhoto style={iconStyle} />}>
            Posters
          </Tabs.Tab>
          <Tabs.Tab value="money" leftSection={<IconMessageCircle style={iconStyle} />}>
            Money
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
      <Grid p="lg">
        <Grid.Col span={1}>
          <Flex direction="column" align="center">
            <Text size="sm" fw="bolder">
              Admin
            </Text>
            <Center>
              <Flex direction="column">
                {followers.map((follower, i) => {
                  if (i > 1) return;
                  return (
                    <Tooltip label={follower.username} key={i}>
                      <Avatar src={follower.userImagePath} alt="it's me" />
                    </Tooltip>
                  );
                })}
              </Flex>
            </Center>
          </Flex>
          <Space h="sm" />
          <Flex direction="column" align="center">
            <Text size="sm" fw="bolder">
              Followers
            </Text>
            <Flex direction="column">
              {followers.map((follower, i) => {
                if (i < 2) return;
                if (i > 2 && i < 10) {
                  return (
                    <Tooltip label={follower.username} key={i}>
                      <Avatar src={follower.userImagePath} alt="it's me" />
                    </Tooltip>
                  );
                }
                if (i === 11) {
                  return (
                    <>
                      <Modal opened={opened} onClose={close} title="Followers">
                        {content}
                      </Modal>
                      <Tooltip label="View all" key={i}>
                        <ActionIcon radius="lg" size={'lg'} color="orange" onClick={open}>
                          <Avatar alt="it's me">
                            <Overlay color="#000" backgroundOpacity={0.35} />
                            {followers.length}
                          </Avatar>
                        </ActionIcon>
                      </Tooltip>
                    </>
                  );
                }
              })}
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={8}>
          <MasjidMiddleContent />
        </Grid.Col>
        <Grid.Col span={3}>
          <Paper withBorder p="xs" mb="sm">
            <Text>
              RIGHT SIDE BAR (ARCHIVED POSTER) - Archived Poster Items Card * Picture, Name,
              Organiser (Picture or Initials), stacked avatars with number of witnesses, donation
              collected, likes
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const MasjidMiddleContent = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();

  const router = useRouter();

  const content = Array(20).fill(0);

  return (
    <>
      {content.map((_) => {
        const {
          followers,
          name,
          votes,
          startDate,
          photos,
          status,
          likes,
          targetAmount,
          currentAmount,
          contributions,
          comments,
        } = createMockPoster();
        return (
          <div ref={ref}>
            <Paper
              withBorder
              p="xs"
              mb="xl"
              style={{ cursor: 'pointer', borderWidth: hovered && 1 }}
            >
              <Flex justify="space-between" align="center" mb="xs">
                <Text size="lg" fw="bolder" onClick={() => router.push('/poster/id')}>
                  {name}
                </Text>
                <Text size="xs">{dayjs(startDate).format('DD/MM/YYYY')}</Text>
              </Flex>
              <Flex>
                <Stack align="center" gap="xs" mr="sm">
                  <ActionIcon variant="subtle" onClick={open}>
                    <IconArrowBigUp size={20} />
                  </ActionIcon>

                  {votes.upvote + votes.downvote}

                  <ActionIcon variant="subtle" onClick={open}>
                    <IconArrowBigDown size={20} />
                  </ActionIcon>
                </Stack>

                <Flex direction="column" w="100%" gap="xs">
                  <Flex justify="space-between">
                    <Flex direction="column">
                      <Text size="xs" fw="bolder">
                        Organisers
                      </Text>
                      <Flex>
                        {followers.map((follower, i) => {
                          if (i > 1) return;
                          return (
                            <Tooltip label={follower.username} key={i}>
                              <Avatar src={follower.userImagePath} alt="it's me" />
                            </Tooltip>
                          );
                        })}
                      </Flex>
                    </Flex>
                    <Box>
                      <Text size="xs" fw="bolder">
                        Witnessess
                      </Text>
                      <Flex>
                        {followers.map((follower, i) => {
                          if (i < 2) return;
                          if (i > 2 && i < 8)
                            return (
                              <Tooltip label={follower.username} key={i}>
                                <Avatar src={follower.userImagePath} alt="it's me" />
                              </Tooltip>
                            );
                        })}
                      </Flex>
                    </Box>
                  </Flex>
                  <Progress.Root size="xl">
                    <Overlay color="#000" backgroundOpacity={0.15} center />
                    <Progress.Section value={votes.upvote} color="green">
                      <Progress.Label>Upvote</Progress.Label>
                    </Progress.Section>
                    <Progress.Section value={votes.downvote} color="red">
                      <Progress.Label>Downvote</Progress.Label>
                    </Progress.Section>
                  </Progress.Root>
                </Flex>
              </Flex>
              <Space h="sm" />
              <Flex>
                <Stack justify="flex-start" mr="md">
                  <Text size="sm" fw="bolder">
                    {status}
                  </Text>

                  <Image radius="xl" src={photos[0]?.imagePath} h={150} w={150} />
                  <Stack align="center" gap="xs">
                    <Button radius="md" variant="light" leftSection={<IconHeartFilled size={14} />}>
                      {likes}
                    </Button>
                  </Stack>
                </Stack>
                <Box style={{ flexBasis: '100%' }}>
                  <Progress.Root size={40}>
                    <Overlay color="#000" backgroundOpacity={0.3} center>
                      {`RM ${currentAmount} / RM ${targetAmount}`}
                    </Overlay>

                    <Tooltip label="Documents – 33Gb">
                      <Progress.Section value={20} color="cyan"></Progress.Section>
                    </Tooltip>
                    <Tooltip label="Other – 15Gb">
                      <Progress.Section value={80} color="gray  "></Progress.Section>
                    </Tooltip>
                  </Progress.Root>
                  <Box mt="xs">
                    <Text size="sm" fw="bolder">
                      Latest Contributions
                    </Text>
                    <Table>
                      <Table.Tbody>
                        {contributions.map((element, i) => {
                          const now = dayjs();
                          const then = dayjs(element.lastContributionDate);
                          const diffInMinutes = now.diff(then, 'minute');

                          // Format the result for display
                          const formattedDiff = then.fromNow();
                          return (
                            <Table.Tr key={i}>
                              <Table.Td>{element.username}</Table.Td>
                              <Table.Td>{`RM ${element.giving[0].amount}`}</Table.Td>
                              <Table.Td>{formattedDiff}</Table.Td>
                            </Table.Tr>
                          );
                        })}
                      </Table.Tbody>
                      {/* <Table.Tfoot>
                        <Modal opened={opened} onClose={close} title="Contributions">
                          {contributions.map((item) => {
                            return <div>{item.username}</div>;
                          })}
                        </Modal>
                        <Center>
                          <ActionIcon variant="subtle" onClick={open}>
                            <IconChevronDown size={14} />
                          </ActionIcon>
                        </Center>
                      </Table.Tfoot> */}
                    </Table>
                  </Box>
                  <Group mt="sm">
                    <Button
                      variant="white"
                      size="xs"
                      leftSection={<FontAwesomeIcon icon={faHandHoldingDollar} />}
                    >
                      Donate
                    </Button>
                    <Button
                      variant="subtle"
                      color="gray"
                      size="xs"
                      leftSection={<FontAwesomeIcon icon={faComment} />}
                    >{`${comments.length} Comments`}</Button>
                    <Button
                      variant="subtle"
                      color="gray"
                      size="xs"
                      leftSection={<FontAwesomeIcon icon={faShare} />}
                    >
                      Share
                    </Button>
                  </Group>
                </Box>
              </Flex>
            </Paper>
          </div>
        );
      })}
      <Paper withBorder p="xs" mb="sm">
        <Text>
          MIDDLE CONTENT BAR (ACTIVE POSTERS) - Active posters card (Voting phase / Contribution
          phase) * Picture, Name, Organiser (Picture or Initials), stacked avatars with number of
          witnesses, donation collected, likes, progress bar. - Active Poster item sidebar showing *
          Contribution log. E.g. Ali donated Rm 5 10 minutes ago. Abu likes the poster 11 minutes
          ago. * Participation log. E.g. Ruby participates as a witness 8 minutes ago
        </Text>
      </Paper>
    </>
  );
};

export default Masjid;
