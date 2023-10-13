import { Text, Space, Grid } from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';

import { useInputState } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { PlaceData } from '../definitions';
import { MapSearchContext } from '../store/contexts/mapSearch';
import { getMasjidListing } from '../lib/api';
import SimpleMap from '../components/Map';
import Sidebar from '../components/Sidebar';

type MasjidProps = {
  data: PlaceData[];
  token: string;
};

const Masjid: NextPage<MasjidProps> = ({ data, token }) => {
  const { searchText, onSetListData, listData, onSetNextPageToken, showDistrictBar } =
    useContext(MapSearchContext);
  const [inputChange, setInputChange] = useInputState('masjid');

  useEffect(() => {
    onSetListData(data);
    onSetNextPageToken(token);
  }, [data]);

  return (
    <Grid>
      <Grid.Col span={showDistrictBar ? 5 : 4}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={showDistrictBar ? 7 : 8}>
        <Space h="sm" />
        <Text fw={'bolder'} size="lg">{`Masjid ${
          searchText === 'masjid' ? 'in Malaysia' : searchText
        }`}</Text>
        <Space h="sm" />
        <SimpleMap />
      </Grid.Col>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const listingData = await getMasjidListing({ search: 'masjid' });
    return {
      props: { data: listingData.results as PlaceData[], token: listingData.nextPageToken },
    };
  } catch (error) {
    console.error('error');
    return {
      props: { data: [] },
    };
  }
};

export default Masjid;
