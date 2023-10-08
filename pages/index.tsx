import {
  Text,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Table,
  Space,
  Box,
  Grid,
} from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';

import { useInputState } from '@mantine/hooks';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
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
  const { stateName, district, onSetListData, listData, onSetNextPageToken } =
    useContext(MapSearchContext);
  const [inputChange, setInputChange] = useInputState('masjid');

  useEffect(() => {
    onSetListData(data);
    onSetNextPageToken(token);
  }, [data]);

  const rows = listData.map((element) => (
    <tr key={element.place_id}>
      <td>{element.name}</td>
      <td>{element.business_status}</td>
      <td>{element.formatted_address}</td>
      <td>{element.user_ratings_total}</td>
    </tr>
  ));

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('handleSubmit', inputChange);

    try {
      const search = `${inputChange} at ${district || stateName}`;
      const listingData = await getMasjidListing({ search });

      const { results, nextPageToken } = listingData;

      console.log(results);
      onSetListData(results);
      onSetNextPageToken(nextPageToken);
    } catch (err) {
      console.log('Failed: getMasjidListing');
    }
  };

  return (
    <Grid>
      <Grid.Col span={5}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={7}>
        <Space h="md" />

        <form onSubmit={handleSubmit}>
          <Flex gap={20}>
            <Input value={inputChange} onChange={setInputChange} />
            <Button type="submit">Search </Button>
            <Text py="md">{`Search for ${district}, ${stateName || ''}`}</Text>
          </Flex>
        </form>

        <SimpleMap />
        {/* 
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Address</th>
                <th>User Ratings</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table> */}
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
