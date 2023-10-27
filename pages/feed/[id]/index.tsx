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
  SimpleGrid,
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHandHoldingDollar, faShare } from '@fortawesome/free-solid-svg-icons';
import CreatePoster from '../../../components/CreatePoster/CreatePoster';

const Feed = () => {
  const { selectedData } = useContext(MapSearchContext);

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
    <Container mt="xl">
      <Grid p="md">
        <Grid.Col span={9} bg="gray.9">
          <Flex>
            <Avatar src={photos[0].imagePath} alt="it's me" />

            <Space w="md" />
            <CreatePoster style={{ flex: 1 }} />
          </Flex>
          <Space h="md" />
          <MasjidMiddleContent />
        </Grid.Col>
        <Grid.Col span={3} pl="md">
          <Text size="sm" fw="bolder">
            Contributions
          </Text>
          <Space h="md" />
          <MasjidRightContent />
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
        let data = null as Poster;

        if (!data) {
          data = createMockPoster();
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
        } = data;

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
                              <Table.Td>{lastEntry.type}</Table.Td>
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
              <Stack align="center" gap="xs" mr="sm">
                <Button
                  onClick={open}
                  variant="transparent"
                  leftSection={<IconArrowBigUp size={20} />}
                >
                  Upvote
                </Button>

                {votes.upvote + votes.downvote}

                <Button
                  onClick={open}
                  variant="transparent"
                  leftSection={<IconArrowBigDown size={20} />}
                >
                  Downvote
                </Button>
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
              <Flex justify="space-between" align="center" mb="xs">
                <Text size="lg" fw="bolder" onClick={() => router.push('/poster/id')}>
                  {name}
                </Text>
                <Text size="xs">{dayjs(startDate).format('DD/MM/YYYY')}</Text>
              </Flex>
              <Text size="xs">{remark}</Text>

              <Space h="md" />

              {status == 'Pending' ? renderVoteSection : renderContributionSection}
            </Paper>
          </div>
        );
      })}
    </>
  );
};

const MasjidRightContent = () => {
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
                RM {contributedAmount}
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

export default Feed;
