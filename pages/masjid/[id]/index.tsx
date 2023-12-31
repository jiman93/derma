import {
  Text,
  Button,
  Container,
  Flex,
  Table,
  Space,
  Grid,
  Paper,
  Avatar,
  Tooltip,
  Overlay,
  Progress,
  Box,
  Image,
  Group,
  Stack,
  Tabs,
  rem,
  Modal,
  ActionIcon,
} from '@mantine/core';

import { useDisclosure, useHover } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';

import { MapSearchContext } from '../../../store/contexts/mapSearch';
import { createMockPoster, mockMasjid } from '../../../lib/mock';
import { Masjid, Poster } from '../../../definitions/entities';
import dayjs from 'dayjs';
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconHeartFilled,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHandHoldingDollar, faShare } from '@fortawesome/free-solid-svg-icons';

const Masjid = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = { width: rem(12), height: rem(12) };

  const [mockData, setMockData] = useState<Masjid>(null);

  useEffect(() => {
    if (!mockData) {
      const data = mockMasjid();
      setMockData(data);
    }
  }, []);

  if (!mockData) return <div />;

  const { name, photos, location, followers } = mockData;

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>{`Follower ${index}`}</p>);

  return (
    <Container pos="relative">
      <Image src={photos[0].imagePath} height={300} />

      <Flex top={245} pos="absolute" mx="lg" w="90%">
        <Avatar src={photos[1].imagePath} size={150} />

        <Box ml="xl" mt={65} w="100%">
          <Flex justify="space-between">
            <Flex direction="column">
              <Text size="xl" fw="bolder">
                {name}
              </Text>
              <Text size="xs">{`${location.district}, ${location.state}`}</Text>
            </Flex>
            <Flex direction="column" align="end">
              <Flex direction="row" mt="md" ml="md">
                {followers.map((follower, i) => {
                  if (i < 2) {
                    return (
                      <Tooltip label={follower.username} key={i} color="green">
                        <Avatar src={follower.userImagePath} alt="it's me" size={40} />
                      </Tooltip>
                    );
                  }
                  if (i > 2 && i < 10) {
                    return (
                      <Tooltip label={follower.username} key={i}>
                        <Avatar src={follower.userImagePath} alt="it's me" size={35} />
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
              <Text size="xs">{`2 Admins ${followers.length} followers`}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Space h={120} />
      <Box pos="relative">
        <Tabs defaultValue="posters">
          <Tabs.List>
            <Tabs.Tab value="posters" leftSection={<IconPhoto style={iconStyle} />}>
              Posters
            </Tabs.Tab>
            <Tabs.Tab value="donations" leftSection={<IconMessageCircle style={iconStyle} />}>
              Donations
            </Tabs.Tab>
            <Tabs.Tab value="media" leftSection={<IconSettings style={iconStyle} />}>
              Media
            </Tabs.Tab>
          </Tabs.List>

          <Space h="sm" />

          <Tabs.Panel value="posters">
            <MasjidPostersTab data={mockData} />
          </Tabs.Panel>

          <Tabs.Panel value="donations"> Donations tab content</Tabs.Panel>

          <Tabs.Panel value="media">Media tab content</Tabs.Panel>
        </Tabs>
      </Box>
    </Container>
  );
};

const MasjidPostersTab = ({ data }) => {
  return (
    <Grid p="md">
      <Grid.Col span={9} bg="gray.9">
        <Text size="sm" fw="bolder">
          Active Posters
        </Text>
        <Space h="md" />
        <MasjidMiddleContent data={data} />
      </Grid.Col>
      <Grid.Col span={3} pl="md">
        <Text size="sm" fw="bolder">
          Completed Posters
        </Text>
        <Space h="md" />
        <MasjidRightContent data={data} />
      </Grid.Col>
    </Grid>
  );
};

const MasjidMiddleContent = ({ data }: { data: Masjid }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();

  const router = useRouter();

  const content = Array(20).fill(0);

  return (
    <>
      {data.posters.map((item) => {
        {
          /* {content.map((item) => {
        let data = null as Poster;

        if (!data) {
          data = createMockPoster();
        } */
        }
        const {
          followers,
          name,
          remark,
          votes,
          startDate,
          endDate,
          photos,
          status,
          likes,
          targetAmount,
          currentAmount,
          contributions,
          comments,
          creator,
        } = item;

        const renderContributionSection = (
          <Grid>
            <Grid.Col span={3}>
              <Stack justify="flex-start" mr="md">
                <Text size="sm" fw="bolder">
                  {status}
                </Text>

                <Image radius="xl" src={photos[0]?.imagePath} h={150} w={150} />
                <Stack align="center" gap="xs">
                  <Button
                    radius="md"
                    variant="transparent"
                    leftSection={<IconHeartFilled size={14} />}
                  >
                    {likes}
                  </Button>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={9}>
              <Flex>
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
                  <Flex justify="end">
                    <Text size="xs">Contribution ends {dayjs(endDate).format('DD/MM/YYYY')}</Text>
                  </Flex>

                  <Box mt="xs">
                    <Text size="sm" fw="bolder">
                      Latest Contributions
                    </Text>
                    <Table>
                      <Table.Tbody>
                        {contributions.map((element, i) => {
                          const { entries } = element;
                          const lastEntry = entries[entries.length - 1];

                          const then = dayjs(lastEntry.date);
                          const formattedDiff = then.fromNow();

                          // show only latest 3 contributors
                          if (i > 2) return;

                          return (
                            <Table.Tr key={i}>
                              <Table.Td>{element.user.username}</Table.Td>
                              <Table.Td>{`${lastEntry.type}`}</Table.Td>
                              <Table.Td>{formattedDiff}</Table.Td>
                            </Table.Tr>
                          );
                        })}
                      </Table.Tbody>
                    </Table>

                    <Space h="sm" />
                    <Group>
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
                </Box>
              </Flex>
            </Grid.Col>
          </Grid>
        );

        const renderVoteSection = (
          <Grid>
            <Grid.Col span={3}>
              <Stack justify="flex-start" mr="md">
                <Text size="sm" fw="bolder">
                  {status}
                </Text>

                <Image radius="xl" src={photos[0]?.imagePath} h={150} w={150} />
              </Stack>
            </Grid.Col>

            <Grid.Col span={9}>
              <Flex justify="space-between">
                <Flex direction="column">
                  <Text size="sm" fw="bolder">
                    Organisers
                  </Text>
                  <Space h="sm" />
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
                  <Space h="sm" />
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
              <Space h="md" />

              <Progress.Root size="xl">
                <Overlay color="#000" backgroundOpacity={0.15} center />
                <Progress.Section value={votes.upvote} color="green">
                  <Progress.Label>Upvote</Progress.Label>
                </Progress.Section>
                <Progress.Section value={votes.downvote} color="red">
                  <Progress.Label>Downvote</Progress.Label>
                </Progress.Section>
              </Progress.Root>

              <Flex justify="space-between">
                <Text size="xs">Vote starts {dayjs(votes.voteStartDate).format('DD/MM/YYYY')}</Text>
                <Text size="xs">Vote ends {dayjs(votes.voteEndDate).format('DD/MM/YYYY')}</Text>
              </Flex>

              <Space h="sm" />
              <Group>
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
            </Grid.Col>
          </Grid>
        );

        return (
          <div ref={ref}>
            <Paper withBorder p="xs" mb="xl" style={{ cursor: 'pointer' }}>
              <Flex justify="space-between" mb="xs">
                <Stack maw="80%">
                  <Group>
                    <Tooltip label={creator.name}>
                      <Avatar src={creator.avatarPath} alt="it's me" />
                    </Tooltip>
                    <Text size="lg" fw="bolder" onClick={() => router.push('/poster/id')}>
                      {name}
                    </Text>
                  </Group>
                  <Text size="xs">{remark}</Text>
                </Stack>
                <Stack align="end">
                  <ActionIcon variant="subtle" mr="xs" size="md">
                    <Text size="xl">{likes}</Text>
                  </ActionIcon>
                  <Text size="xs">{dayjs(startDate).format('DD/MM/YYYY')}</Text>
                </Stack>
              </Flex>

              <Space h="md" />

              {status == 'Pending' ? renderVoteSection : renderContributionSection}
            </Paper>
          </div>
        );
      })}
    </>
  );
};

const MasjidRightContent = ({ data }: { data: Masjid }) => {
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
          contributedAmount,
          contributions,
          comments,
          endDate,
        } = createMockPoster();
        return (
          <div ref={ref}>
            <Paper withBorder p="xs" style={{ cursor: 'pointer' }}>
              <Flex>
                <ActionIcon variant="subtle" mr="xs" size="md">
                  {likes}
                </ActionIcon>
                <Text size="sm" fw="bolder" onClick={() => router.push('/poster/id')}>
                  {name}
                </Text>
              </Flex>

              <Button
                radius="md"
                variant="transparent"
                leftSection={<FontAwesomeIcon icon={faHandHoldingDollar} />}
              >
                {contributedAmount}
              </Button>

              <Flex justify="end">
                <Text size="xs">Completed on {dayjs(endDate).format('DD/MM/YYYY')}</Text>
              </Flex>
            </Paper>

            <Space h="md" />
          </div>
        );
      })}
    </>
  );
};

export default Masjid;
