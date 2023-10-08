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
      <Grid.Col span={2}>
        <Paper withBorder p="xl">
          <Text>
            LEFT SIDE BAR 1 (User details box) - name, alias, dob, email, social media links LEFT
            SIDE BAR 2 (Contribution details) * Only visible to page owner. - Total Contribution
            points. - Money donated this week and overall. - Weekly Contribution Calendar. - OnClick
            Weekly calendar will pop up and show a full-fledged calendar. - Premium feature :
            Full-fledged Contribution Calendar and analytics
          </Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={8}>
        <Paper withBorder p="xl" mb="sm">
          <Text>
            IDDLE FEED BAR (FOLLOWING FEEDS) - Following Activity Card 3 types : 1) User 2) Masjid
            3) Poster 1) User - User participation - User giving 2) Masjid - New posters 3) Posters
            - Poster starting contribution or giving phase - Poster completed (points earned) 4)
            Recommendations - High voted posters - Nearby masjid posters 5) Notifications. - Likes
            received from user donations .e.g 126 people appreciate your donation to Sumbangan
            masjid - Occasional update on following poster: current amount, number of likes
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
            IDDLE FEED BAR (FOLLOWING FEEDS) - Following Activity Card 3 types : 1) User 2) Masjid
            3) Poster 1) User - User participation - User giving 2) Masjid - New posters 3) Posters
            - Poster starting contribution or giving phase - Poster completed (points earned) 4)
            Recommendations - High voted posters - Nearby masjid posters 5) Notifications. - Likes
            received from user donations .e.g 126 people appreciate your donation to Sumbangan
            masjid - Occasional update on following poster: current amount, number of likes
          </Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={2}>
        <Paper withBorder p="xl">
          <Text>
            RIGHT SIDE BAR (RECENT CONTRIBUTION LOG) - Number of posters contributed for the past 30
            days. - Contributed Card: Recipient name, contribution date, participation / giving,
            points
          </Text>
        </Paper>
      </Grid.Col>
    </Grid>
  </Container>
);

export default Masjid;
