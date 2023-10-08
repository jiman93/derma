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
} from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';

import { useInputState } from '@mantine/hooks';
import { SyntheticEvent, useContext, useState } from 'react';
import SimpleMap from '../../components/Map';

import { MapSearchContext } from '../../store/contexts/mapSearch';
import { PlaceData } from '../../definitions';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
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
      <Grid.Col span={8}>
        <Paper withBorder p="xl" mb="sm">
          <Text>
            MIDDLE CONTENT BAR (ACTIVE POSTERS) - Active posters card (Voting phase / Contribution
            phase) * Picture, Name, Organiser (Picture or Initials), stacked avatars with number of
            witnesses, donation collected, likes, progress bar. - Active Poster item sidebar showing
            * Contribution log. E.g. Ali donated Rm 5 10 minutes ago. Abu likes the poster 11
            minutes ago. * Participation log. E.g. Ruby participates as a witness 8 minutes ago
          </Text>
        </Paper>
        <Paper withBorder p="xl">
          <Text>
            MIDDLE CONTENT BAR (ACTIVE POSTERS) - Active posters card (Voting phase / Contribution
            phase) * Picture, Name, Organiser (Picture or Initials), stacked avatars with number of
            witnesses, donation collected, likes, progress bar. - Active Poster item sidebar showing
            * Contribution log. E.g. Ali donated Rm 5 10 minutes ago. Abu likes the poster 11
            minutes ago. * Participation log. E.g. Ruby participates as a witness 8 minutes ago
          </Text>
        </Paper>
        <Paper withBorder p="xl">
          <Text>
            MIDDLE CONTENT BAR (ACTIVE POSTERS) - Active posters card (Voting phase / Contribution
            phase) * Picture, Name, Organiser (Picture or Initials), stacked avatars with number of
            witnesses, donation collected, likes, progress bar. - Active Poster item sidebar showing
            * Contribution log. E.g. Ali donated Rm 5 10 minutes ago. Abu likes the poster 11
            minutes ago. * Participation log. E.g. Ruby participates as a witness 8 minutes ago
          </Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={3}>
        <Paper withBorder p="xl">
          <Text>
            RIGHT SIDE BAR (ARCHIVED POSTER) - Archived Poster Items Card * Picture, Name, Organiser
            (Picture or Initials), stacked avatars with number of witnesses, donation collected,
            likes
          </Text>
        </Paper>
      </Grid.Col>
    </Grid>
  </Container>
);

export default Masjid;
