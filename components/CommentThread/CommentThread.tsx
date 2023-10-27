import {
  Text,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Table,
  Space,
  Image,
  Grid,
  Paper,
  List,
  ThemeIcon,
  Timeline,
  Tooltip,
  Avatar,
  Box,
  Modal,
  ActionIcon,
  Overlay,
  Progress,
  Group,
  Stack,
  Center,
  Divider,
  Collapse,
  Badge,
} from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faChevronDown,
  faComment,
  faCommentDots,
  faDownLong,
  faHandHoldingDollar,
  faMinus,
  faPlus,
  faShare,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { Comment, Poster } from '../../definitions/entities';
import { useRouter } from 'next/router';
import { RichTextEditor } from '@mantine/tiptap';
import dayjs from 'dayjs';
import { useDisclosure } from '@mantine/hooks';
import CommentTextEditor from '../CommentTextEditor/CommentTextEditor';

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <Box>
      {comments.map((comment) => {
        return (
          <Paper p="xs" m="xs">
            <CommentItems comment={comment} />
          </Paper>
        );
      })}
    </Box>
  );
};

const CommentItems = ({ comment }: { comment: Comment }) => {
  const [opened, { toggle }] = useDisclosure(true);
  const [openReply, { toggle: toggleOpenReply }] = useDisclosure(false);

  const renderDate = () => {
    const then = dayjs(comment.createdDate);
    const formattedDiff = then.fromNow();
    return formattedDiff;
  };

  const renderType = () => {
    const { type } = comment;
    let color = '';

    // if (type === 'Vote Phase') {
    //   color = 'Yellow';
    // }

    // if (type === 'Vote Phase') {
    //   color = 'Yellow';
    // }

    return (
      <>
        {type ? (
          <Badge color={'gray'} size="xs">
            {type}
          </Badge>
        ) : (
          <div />
        )}
      </>
    );
  };

  return (
    <>
      <Flex justify="space-between">
        <Group mb="sm">
          <Avatar src={comment.user.avatarPath} />
          <Text size="sm" fw="bolder">
            {comment.user.name}
          </Text>
          <Text c="dimmed" mb="auto" size="xs">
            {renderDate()}
          </Text>
        </Group>

        <Group mb="auto">
          {renderType()}
          <ActionIcon variant="subtle" color="light.8" size="xs" onClick={toggle}>
            <FontAwesomeIcon icon={opened ? faMinus : faPlus} />
          </ActionIcon>
        </Group>
      </Flex>
      <Collapse in={opened}>
        <Text size="sm">{comment.text}</Text>

        <Group gap="xs">
          <ActionIcon variant="subtle" color="light.8" size="xs">
            <FontAwesomeIcon icon={faUpLong} />
          </ActionIcon>
          <Text size="xs" fw="bolder">
            {comment.upvote}
          </Text>
          <ActionIcon variant="subtle" color="light.8" size="xs">
            <FontAwesomeIcon icon={faDownLong} />
          </ActionIcon>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            onClick={toggleOpenReply}
            leftSection={<FontAwesomeIcon icon={faComment} />}
          >{`Reply`}</Button>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            leftSection={<FontAwesomeIcon icon={faShare} />}
          >
            Share
          </Button>
        </Group>

        {openReply && <CommentTextEditor m="sm" />}

        <Space h="xs" />

        <Box ml="md">
          {comment.replies.map((reply) => (
            <CommentItem comment={reply} />
          ))}
        </Box>
      </Collapse>
    </>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [opened, { toggle }] = useDisclosure(true);
  const [openReply, { toggle: toggleOpenReply }] = useDisclosure(false);

  const renderDate = () => {
    const then = dayjs(comment.createdDate);
    const formattedDiff = then.fromNow();
    return formattedDiff;
  };

  return (
    <>
      <Flex justify="space-between">
        <Group mb="sm">
          <Avatar src={comment.user.avatarPath} />
          <Text size="sm" fw="bolder">
            {comment.user.name}
          </Text>
          <Text c="dimmed" mb="auto" size="xs">
            {renderDate()}
          </Text>
        </Group>
      </Flex>
      <Collapse in={opened}>
        <Text size="sm">{comment.text}</Text>

        <Group gap="xs">
          <ActionIcon variant="subtle" color="light.8" size="xs">
            <FontAwesomeIcon icon={faUpLong} />
          </ActionIcon>
          <Text size="xs" fw="bolder">
            {comment.upvote}
          </Text>
          <ActionIcon variant="subtle" color="light.8" size="xs">
            <FontAwesomeIcon icon={faDownLong} />
          </ActionIcon>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            onClick={toggleOpenReply}
            leftSection={<FontAwesomeIcon icon={faComment} />}
          >{`Reply`}</Button>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            leftSection={<FontAwesomeIcon icon={faShare} />}
          >
            Share
          </Button>
        </Group>
      </Collapse>

      {openReply && <CommentTextEditor m="sm" />}

      <Space h="xs" />
    </>
  );
};

export default CommentSection;
