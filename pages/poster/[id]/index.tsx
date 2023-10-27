import {
  Text,
  Button,
  Container,
  Flex,
  Table,
  Space,
  Image,
  Grid,
  Timeline,
  Tooltip,
  Avatar,
  Box,
  Modal,
  ActionIcon,
  Overlay,
  Progress,
  Divider,
} from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { IconGitBranch, IconGitCommit, IconThumbUp } from '@tabler/icons-react';
import { createMockPoster } from '../../../lib/mock';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Comment, Poster } from '../../../definitions/entities';
import { useRouter } from 'next/router';
import CommentSection from '../../../components/CommentThread/CommentThread';
import CommentTextEditor from '../../../components/CommentTextEditor/CommentTextEditor';

const Poster = () => {
  let [data, setData] = useState<Poster>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      const create = createMockPoster();
      setData(create);
    }
  }, []);

  if (!data) return <div />;

  const {
    followers,
    name,
    masjid,
    remark,
    votes,
    startDate,
    endDate,
    photos,
    targetAmount,
    currentAmount,
    contributions,
    comments,
  } = data;

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>{`Follower ${index}`}</p>);

  const renderAvatarsRow = () => {
    return (
      <>
        {followers.map((follower, i) => {
          if (i < 2) {
            return (
              <Tooltip label={follower.username} key={i} color="green">
                <Avatar
                  src={follower.userImagePath}
                  alt="it's me"
                  size={40}
                  onClick={() => router.push('/user/id')}
                />
              </Tooltip>
            );
          }
          if (i > 2 && i < 10) {
            return (
              <Tooltip label={follower.username} key={i}>
                <Avatar
                  src={follower.userImagePath}
                  alt="it's me"
                  size={35}
                  onClick={() => router.push('/user/id')}
                />
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
      </>
    );
  };

  const renderVoteSection = (
    <Grid>
      <Grid.Col span={9}>
        <Progress.Root size={22}>
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
      </Grid.Col>
      <Grid.Col span={3}>
        <Button radius="md" leftSection={<IconThumbUp size={14} />}>
          Vote Now!
        </Button>
      </Grid.Col>
    </Grid>
  );

  const renderContributionSection = (
    <Box>
      <Grid>
        <Grid.Col span={9}>
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
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            radius="md"
            variant="white"
            leftSection={<FontAwesomeIcon icon={faHandHoldingDollar} />}
          >
            Donate
          </Button>
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <Text size="sm" fw="bolder">
        Top Contributors
      </Text>
      <Table>
        <Table.Tbody>
          {contributions.map((element, i) => {
            const { entries } = element;
            const lastEntry = entries[entries.length - 1];

            const then = dayjs(lastEntry.date);
            const formattedDiff = then.fromNow();

            // show only latest 3 contributors
            if (i > 5) return;

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

      <Flex justify="center">
        <ActionIcon radius="xl" variant="subtle">
          <FontAwesomeIcon icon={faChevronDown} />
        </ActionIcon>
      </Flex>
    </Box>
  );

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
              <Text size="xs">{`${masjid.name}`}</Text>
            </Flex>
            <Flex direction="column" align="end">
              <Flex direction="row" mt="md" ml="md">
                {renderAvatarsRow()}
              </Flex>
              <Text size="xs">{`2 Organisers ${followers.length} Contributors`}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Space h={120} />

      <Grid>
        <Grid.Col span={9} bg="gray.9" p="lg">
          <Timeline active={2} bulletSize={32} lineWidth={2}>
            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title={
                <Flex justify="space-between">
                  <Text fw="bold" size="lg">
                    Creation
                  </Text>
                  <Text size="sm" fw="bolder">
                    {dayjs(startDate).format('DD/MM/YYYY')}
                  </Text>
                </Flex>
              }
            >
              <Box p="lg">
                <Text c="dimmed">{remark}</Text>
              </Box>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title={
                <Flex justify="space-between">
                  <Text fw="bold" size="lg">
                    Vote Phase
                  </Text>

                  <Text size="sm" fw="bolder">
                    {dayjs(startDate).format('DD/MM/YYYY')}
                  </Text>
                </Flex>
              }
            >
              <Flex direction="column" p="lg">
                <Flex direction="row">{renderAvatarsRow()}</Flex>
                <Text size="xs">{votes.upvote} number of voters</Text>
              </Flex>

              <Space h="sm" />
              {renderVoteSection}
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title={
                <Flex justify="space-between">
                  <Text fw="bolder" size="lg">
                    Poster Approval
                  </Text>
                  <Text size="sm" fw="bolder">
                    {dayjs(startDate).format('DD/MM/YYYY')}
                  </Text>
                </Flex>
              }
            >
              <Box p="lg">
                <Flex align="center">
                  <Avatar alt="user" src={photos[0].imagePath} mr="sm" />
                  <Text size="sm" fw="bolder">
                    {`Placeholder`}
                  </Text>
                  <Space w="xs" />

                  <Text size="xs"> has approved this poster.</Text>
                </Flex>
                <Space h="xs" />

                <Text size="sm"> Reason: Majority upvote </Text>
              </Box>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title={
                <Text fw="bolder" size="lg">
                  Contribution Phase
                </Text>
              }
            >
              <Box p="lg">
                <Flex direction="column">
                  <Flex direction="row">{renderAvatarsRow()}</Flex>
                  <Text size="xs">{votes.downvote} number of contributors</Text>
                </Flex>

                <Space h="sm" />
                {renderContributionSection}
              </Box>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title={
                <Text fw="bolder" size="lg">
                  Distribution Phase
                </Text>
              }
            >
              <Box p="lg">
                <Flex align="center">
                  <Avatar alt="user" src={photos[0].imagePath} mr="sm" />
                  <Text size="sm" fw="bolder">
                    {`Placeholder`}
                  </Text>
                  <Space w="xs" />

                  <Text size="xs"> has verified the distribution.</Text>
                </Flex>
                <Space h="sm" />
                <Divider />
                <Space h="sm" />

                <Flex>
                  <Image src={photos[0].imagePath} mr="sm" height={100} radius="lg" />
                  <Image src={photos[1].imagePath} mr="sm" height={100} radius="lg" />
                </Flex>
              </Box>
            </Timeline.Item>
          </Timeline>
          <Divider />

          <CommentTextEditor m="lg" />
          <CommentSection comments={comments} />
        </Grid.Col>
        <Grid.Col span={3} pl="md">
          <MasjidRightContent data={data} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const MasjidRightContent = ({ data }: { data: Poster }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();

  const router = useRouter();

  const content = Array(20).fill(0);

  return (
    <>
      {data.contributions.map((item) => {
        const { entries } = item;

        const lastEntry = entries[entries.length - 1];

        const renderDate = () => {
          const then = dayjs(lastEntry.date);
          const formattedDiff = then.fromNow();
          return formattedDiff;
        };

        const renderAction = () => {
          let text = `has contributed -> ${lastEntry.type}`;
          // const { type, amount } = contributions[0].giving[0];

          // if (type === 'Donating') {
          //   text = 'has donated ' + `RM ${amount}`;
          // }

          // if (type === 'Liking') {
          //   text = 'has liked the poster';
          // }
          return text;
        };

        return (
          <div ref={ref}>
            <Box p="xs" style={{ cursor: 'pointer' }}>
              <Flex justify="end">
                <Text size="sm">{renderDate()}</Text>
              </Flex>
              <Flex align="center">
                <Avatar alt="user" src={item.user.avatarPath} mr="sm" />
                <Text size="sm" fw="bolder" onClick={() => router.push('/poster/id')}>
                  {item.user.username}
                </Text>
              </Flex>
              <Space h="xs" />
              <Text size="xs"> {renderAction()}</Text>
              {/* <Flex>
                <Button
                  radius="md"
                  variant="transparent"
                  leftSection={<IconHeartFilled size={14} />}
                >
                  {likes}
                </Button>
                <Button
                  radius="md"
                  variant="transparent"
                  leftSection={<FontAwesomeIcon icon={faHandHoldingDollar} />}
                >
                  RM {contributedAmount}
                </Button>
              </Flex> */}
            </Box>

            <Space h="xs" />
          </div>
        );
      })}
    </>
  );
};

export default Poster;
