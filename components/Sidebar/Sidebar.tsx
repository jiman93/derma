import React, { useContext, useEffect, useState } from 'react';
import {
  AppShell,
  Box,
  Button,
  Flex,
  Grid,
  NavLink,
  ScrollArea,
  Text,
  Transition,
} from '@mantine/core';

import { useRouter } from 'next/router';
import loc from '../../public/state_districts.json';
import { MapSearchContext } from '../../store/contexts/mapSearch';
import MapListing from '../MapListing';
import { getMasjidListing } from '../../lib/api';

type District = {
  name: string;
  coordinate: {
    lat: number;
    lng: number;
  };
};

export const Sidebar = () => {
  const {
    onSetDistrict,
    onSetCoordinate,
    onSetStateName,
    showDistrictBar,
    onSetListData,
    onSetNextPageToken,
  } = useContext(MapSearchContext);

  const router = useRouter();
  const [active, setActive] = useState('');
  const [districtList, setDistrictList] = useState([]);

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const fetchList = async ({ newState, newDistrict }) => {
    let searchVal = '';
    if (newDistrict || newState) {
      searchVal = `at ${newDistrict || newState}`;
    }

    try {
      const search = `masjid ${searchVal}`;
      const listingData = await getMasjidListing({ search });

      const { results, nextPageToken } = listingData;

      console.log(results);
      onSetListData(results);
      onSetNextPageToken(nextPageToken);
    } catch (err) {
      console.log('Failed: getMasjidListing');
    }
  };

  const handleStateItemClick = async (item) => {
    await fetchList({ newState: item.state, newDistrict: '' });
    setActive(item.state);
    onSetStateName(item.state);
    onSetDistrict('');
    onSetCoordinate({ lat: item.coordinate.lat, lng: item.coordinate.lng });
    setDistrictList(item.districts);
  };

  const renderStateList = () => {
    return loc.malaysia.map((item, i) => (
      <Button
        key={`${item.state}-${i}`}
        variant="light"
        radius="xl"
        mb="xs"
        onClick={(event) => {
          event.preventDefault();
          handleStateItemClick(item);
        }}
      >
        <Text>{item.state.substring(0, 3)}</Text>
      </Button>
    ));
  };

  const renderDistrictList = () => {
    return (
      <Transition
        mounted={showDistrictBar}
        transition="scale-x"
        duration={200}
        exitDuration={200}
        timingFunction="ease"
      >
        {(style) => (
          <div style={{ ...style, width: 200 }}>
            <ScrollArea style={{ height: '100vh' }} ml="lg">
              <div>
                <Box>
                  {districtList.map((item: District) => (
                    <NavLink
                      key={item.name}
                      label={item.name}
                      onClick={async () => {
                        await fetchList({ newState: '', newDistrict: item.name });

                        onSetDistrict(item.name);
                        onSetCoordinate(item.coordinate);
                      }}
                    />
                  ))}
                </Box>
              </div>
            </ScrollArea>
          </div>
        )}
      </Transition>
    );
  };

  return (
    <Flex>
      <ScrollArea style={{ height: '100vh', width: 80 }}>
        <div>
          <Flex direction="column"> {renderStateList()}</Flex>
        </div>
      </ScrollArea>
      {renderDistrictList()}
      <Box maw={350} ml="lg">
        <div>
          <MapListing />
        </div>
      </Box>
    </Flex>
  );
};
