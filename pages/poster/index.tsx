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
  Timeline,
} from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';

import { useInputState } from '@mantine/hooks';
import { SyntheticEvent, useContext, useState } from 'react';
import SimpleMap from '../../components/Map';

import { MapSearchContext } from '../../store/contexts/mapSearch';
import { PlaceData } from '../../definitions';
import {
  IconCircleCheck,
  IconCircleDashed,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from '@tabler/icons-react';
import { HeroContentLeft } from '../../components/Hero';

const Masjid = () => (
  <Container>
    <HeroContentLeft />
    <Grid p="lg">
      <Grid.Col span={1}>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item>1</List.Item>
          <List.Item>2</List.Item>
          <List.Item>3</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
          <List.Item>4</List.Item>
        </List>
      </Grid.Col>
      <Grid.Col span={11}>
        <Paper withBorder p="xl" mb="sm">
          <Text>
            MIDDLE CONTENT BAR (Contributions log) - Show all contributions to the posters. - Over
            RM 100 Contributor will be pinned on top.
          </Text>
        </Paper>

        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
            <Text c="dimmed" size="sm">
              You&apos;ve created new branch{' '}
              <Text variant="link" component="span" inherit>
                fix-notifications
              </Text>{' '}
              from master
            </Text>
            <Text size="xs" mt={4}>
              2 hours ago
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
            <Text c="dimmed" size="sm">
              You&apos;ve pushed 23 commits to
              <Text variant="link" component="span" inherit>
                fix-notifications branch
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              52 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Pull request"
            bullet={<IconGitPullRequest size={12} />}
            lineVariant="dashed"
          >
            <Text c="dimmed" size="sm">
              You&apos;ve submitted a pull request
              <Text variant="link" component="span" inherit>
                Fix incorrect notification message (#187)
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              34 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
            <Text c="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
                Robert Gluesticker
              </Text>{' '}
              left a code review on your pull request
            </Text>
            <Text size="xs" mt={4}>
              12 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
      </Grid.Col>
    </Grid>
  </Container>
);

export default Masjid;
