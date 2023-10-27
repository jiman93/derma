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
  Divider,
  Blockquote,
  Checkbox,
  Chip,
  Collapse,
} from '@mantine/core';

import { useDisclosure, useHover } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';

import { MapSearchContext } from '../../../store/contexts/mapSearch';
import {
  createMockPoster,
  mockMasjid,
  createMockUser,
  createMockOrganisation,
} from '../../../lib/mock';
import { Masjid, Organisation, Poster, User } from '../../../definitions/entities';
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
import {
  faChevronDown,
  faChevronLeft,
  faCircle,
  faComment,
  faEnvelope,
  faFilter,
  faHandHoldingDollar,
  faLocation,
  faLocationDot,
  faLocationPin,
  faShare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import { faker } from '@faker-js/faker';

const Organisation = () => {
  const [mockData, setMockData] = useState<Organisation>(null);

  useEffect(() => {
    if (!mockData) {
      const data = createMockOrganisation();
      setMockData(data);
    }
  }, []);

  if (!mockData) return <div />;

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>{`Follower ${index}`}</p>);

  return (
    <Container pos="relative" size="lg">
      <Box pos="relative">
        <MasjidPostersTab data={mockData} />
      </Box>
    </Container>
  );
};

const MasjidPostersTab = ({ data }: { data: Organisation }) => {
  const [opened, { toggle }] = useDisclosure(true);

  const renderIntroBox = (
    <Paper p="sm">
      <Flex direction="column">
        <Avatar src={data.avatarImage.imagePath} size={300} mb="sm" />

        <Box mb="xs">
          <Text fz={25} fw="bold">
            {data.name}
          </Text>
          <Text fz={20} mb="sm" c="dimmed">
            {data.username}
          </Text>
        </Box>

        <Button w="full" color="gray">
          Follow
        </Button>

        <Flex align="center">
          <FontAwesomeIcon icon={faUsers} />
          <Button variant="subtle" color="light" size="sm">
            300 Followers
          </Button>
        </Flex>

        <Group align="center" mb="sm">
          <FontAwesomeIcon icon={faEnvelope} />
          <Text size="sm" fw="bold">
            {data.website}
          </Text>
        </Group>

        <Group align="center" mb="sm">
          <FontAwesomeIcon icon={faLocationDot} />
          <Text size="sm" fw="bold">
            {`${data.location.district}, ${data.location.state}`}
          </Text>
        </Group>
      </Flex>

      <Divider my="sm" />
      <Flex direction="column">
        <Text size="lg" fw="bold">
          People
        </Text>

        <Group mt="sm" c="dimmed">
          {data.people.map((peep) => {
            return (
              <Tooltip label={peep.name}>
                <Avatar src={peep.avatarImage.imagePath} alt="it's me" />
              </Tooltip>
            );
          })}
        </Group>
      </Flex>

      <Divider my="sm" />
      <Flex direction="column">
        <Text size="lg" fw="bold">
          Posters
        </Text>

        <Group mt="sm" c="dimmed">
          {data.posters.map((poster) => {
            return (
              <Tooltip label={poster.name}>
                <Avatar src={poster.avatarImage.imagePath} />
              </Tooltip>
            );
          })}
        </Group>
      </Flex>

      <Divider my="sm" />
      <Flex direction="column">
        <Text size="lg" fw="bold">
          Masjid
        </Text>

        <Group mt="sm" c="dimmed">
          {data.involvements.map((inv) => {
            return (
              <Tooltip label={inv.masjid.name}>
                <Avatar src={inv.masjid.avatarPath} />
              </Tooltip>
            );
          })}
        </Group>
      </Flex>
    </Paper>
  );

  const currentDate = dayjs().format('YYYY-MM-DD');
  const date365DaysAgo = dayjs(currentDate).subtract(365, 'day').format('YYYY-MM-DD');

  return (
    <Grid p="md">
      <Grid.Col span={4} pl="md">
        <Flex direction="column">{renderIntroBox}</Flex>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack gap="sm">
          <Paper p="xs" mb="sm" radius="lg" bg="gray.9">
            <Flex justify={'space-between'}>
              <Text fw="bold" size="lg">
                Activities
              </Text>
              <Button
                variant="light"
                color="gray"
                leftSection={<FontAwesomeIcon icon={faFilter} />}
              >
                Filter
              </Button>
            </Flex>
          </Paper>

          <Box bg="gray.9">
            <Flex justify="space-between" p="xs">
              <Flex direction="column">
                <Text fw="bold">Year 2023</Text>
              </Flex>
              <ActionIcon variant="subtle" onClick={toggle}>
                <FontAwesomeIcon icon={opened ? faChevronDown : faChevronLeft} />
              </ActionIcon>
            </Flex>
            <Collapse in={opened}>
              <Box p="sm">
                <MasjidMiddleContent />
              </Box>
            </Collapse>
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
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
              <Text size="sm" c="dimmed" mb="xs">
                Poster created, Poster voting poll starts, Poster open for contribution, Poster is
                in distribution process. Poster completed. Poster Archived. Approved a poster.
                Verified a distribution.
              </Text>
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

export default Organisation;
