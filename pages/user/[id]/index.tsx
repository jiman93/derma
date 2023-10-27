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
import { createMockPoster, mockMasjid, createMockUser } from '../../../lib/mock';
import { Masjid, Poster, User } from '../../../definitions/entities';
import dayjs from 'dayjs';

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

const UserProfile = () => {
  const [mockData, setMockData] = useState<User>(null);

  useEffect(() => {
    if (!mockData) {
      const data = createMockUser();
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

const MasjidPostersTab = ({ data }: { data: User }) => {
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
          <FontAwesomeIcon icon={faCircle} size="2xs" />
          <Button variant="subtle" color="light" size="sm">
            256 Followings
          </Button>
        </Flex>

        <Group align="center" mb="sm">
          <FontAwesomeIcon icon={faEnvelope} />
          <Text size="sm" fw="bold">
            {data.email}
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
          Achievements
        </Text>

        <Group mt="sm">Has no achievements.</Group>
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
          Organisations
        </Text>

        <Group mt="sm">{data.organisation}</Group>
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

          <CalendarHeatmap
            startDate={date365DaysAgo}
            endDate={currentDate}
            horizontal
            values={[
              { date: '2023-01-01', count: 12 },
              { date: '2023-01-22', count: 122 },
              { date: '2023-01-30', count: 38 },
              // ...and so on
            ]}
          />
          <Box bg="gray.9">
            <Flex justify="space-between" p="xs">
              <Flex direction="column">
                <Text fw="bold">August 2023</Text>
                <Text c="dimmed" size="sm">
                  Contributed in 13 Posters at 5 different Masjids
                </Text>
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
          masjid,
        } = data;

        return (
          <div ref={ref}>
            <Paper withBorder p="xs" mb="md" style={{ cursor: 'pointer' }}>
              <Flex align="center" gap="lg">
                <Flex direction="column" align="center">
                  <Image radius="xl" src={photos[0]?.imagePath} h={100} w={100} />
                  <Text size="xs" mt="xs">
                    {status}
                  </Text>
                </Flex>
                <Group gap="xs">
                  <Group style={{ flex: '1 0 100%' }}>
                    <Chip.Group multiple>
                      <Group justify="center" mt="md">
                        <Chip value="1">Vote</Chip>
                        <Chip value="2">Donate</Chip>
                        <Chip value="3">Like</Chip>
                        <Chip value="4">Comment</Chip>
                      </Group>
                    </Chip.Group>
                  </Group>
                  <Text size="lg" fw="bolder" onClick={() => router.push('/poster/id')}>
                    {name}
                  </Text>
                  <Text size="xs" ml="auto">
                    {dayjs(startDate).format('DD/MM/YYYY')}
                  </Text>
                  <Text size="xs">{remark}</Text>

                  <Group>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <Text size="xs">{`Masjid ${masjid.name}`}</Text>
                  </Group>
                </Group>
              </Flex>
            </Paper>
          </div>
        );
      })}
    </>
  );
};

export default UserProfile;
