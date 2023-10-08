import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Navbar, NavLink, ScrollArea, Text } from '@mantine/core';
import useStyles from './Sidebar.styles';

import { useRouter } from 'next/router';
import loc from '../../public/state_districts.json';
import { MapSearchContext } from '../../store/contexts/mapSearch';
import MapListing from '../MapListing';

type District = {
  name: string;
  coordinate: {
    lat: number;
    lng: number;
  };
};

export const Sidebar = () => {
  const { onSetDistrict, onSetCoordinate, coordinate, onSetStateName } =
    useContext(MapSearchContext);

  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState('');
  const [districtList, setDistrictList] = useState([]);

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const links = () => {
    return loc.malaysia.map((item, i) => (
      <Button
        key={`${item.state}-${i}`}
        className={cx(classes.link, {
          [classes.linkActive]: item.state === active,
        })}
        variant="light"
        radius="xl"
        mb="xs"
        onClick={(event) => {
          event.preventDefault();
          setActive(item.state);
          onSetStateName(item.state);
          onSetCoordinate({ lat: item.coordinate.lat, lng: item.coordinate.lng });
          setDistrictList(item.districts);
        }}
      >
        <Text>{item.state.substring(0, 3)}</Text>
      </Button>
    ));
  };

  return (
    <Navbar p="md" width={{ md: 600 }} hidden hiddenBreakpoint="sm">
      <Grid>
        <Grid.Col span={2}>
          <ScrollArea type="always" style={{ height: '100vh' }}>
            <Navbar.Section grow>
              <Flex direction="column"> {links()}</Flex>
            </Navbar.Section>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={3}>
          <ScrollArea type="always" style={{ height: '100vh' }}>
            <Navbar.Section grow>
              <Box>
                {districtList.map((item: District) => (
                  <NavLink
                    key={item.name}
                    label={item.name}
                    onClick={() => {
                      onSetDistrict(item.name);
                      onSetCoordinate(item.coordinate);
                    }}
                  />
                ))}
              </Box>
            </Navbar.Section>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={7}>
          <Navbar.Section>
            <MapListing />
          </Navbar.Section>
        </Grid.Col>
      </Grid>
    </Navbar>
  );
};
