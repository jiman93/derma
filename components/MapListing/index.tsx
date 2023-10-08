import {
  Box,
  Code,
  Table,
  Title,
  Text,
  Image,
  ActionIcon,
  Flex,
  Paper,
  Group,
  ScrollArea,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PlaceData } from '../../definitions';
import { getMasjidListing, getPhoto } from '../../lib/api';

import { MapSearchContext } from '../../store/contexts/mapSearch';

type Props = {
  itemData: PlaceData;
};

const MapListing = () => {
  const {
    listData,
    selectedData,
    onSetSelectedData,
    onSetListData,
    onSetNextPageToken,
    nextPageToken,
    district,
    stateName,
  } = useContext(MapSearchContext);
  const [imagePath, setImagePath] = useState('');
  const [page, setPage] = useState(1);

  const getImage = async () => {
    let photoData = '';

    try {
      if (selectedData && selectedData.photos[0]) {
        photoData = selectedData.photos[0].photo_reference;

        const response = (await getPhoto({ reference: photoData })) as any; // Adjust the type accordingly

        setImagePath(response.image);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getImage();
  }, [selectedData]);

  const handleNext = async () => {
    console.log('handleNext', page);
    setPage(2);

    try {
      const search = `masjid at ${district || stateName}`;
      const response = await getMasjidListing({ search, page_token: nextPageToken });
      const { results, nextPageToken: pageToken } = response;

      onSetListData([...listData, ...results]);
      onSetNextPageToken(pageToken);
    } catch (err) {
      console.log('Failed: getMasjidListing');
    }
  };

  const rows = listData.map((element) => (
    <tr key={element.place_id}>
      <Box
        px="sm"
        pb="xs"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onSetSelectedData(element);
        }}
      >
        <Text>{element.name}</Text>
        <Text>
          {element.user_ratings_total} <Code>{element.rating}</Code>
        </Text>
      </Box>
    </tr>
  ));

  console.log('nextPageToken', nextPageToken, !!nextPageToken);

  return (
    <>
      {selectedData && (
        <Paper shadow="xs" p="xl">
          <Text size="lg" weight="bolder">
            {selectedData.name}
          </Text>
          <Image src={imagePath} alt="Your Alt Text" />
          <Text size="xs">{selectedData.formatted_address}</Text>
        </Paper>
      )}

      <Flex mb="xs" mr="lg" justify="space-around">
        <Text>Masjid number: {listData.length}</Text>
      </Flex>

      <InfiniteScroll
        height={500}
        dataLength={listData.length} //This is important field to render the next data
        next={handleNext}
        hasMore={!!nextPageToken}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Table striped withBorder={false}>
          <tbody>{rows}</tbody>
        </Table>
      </InfiniteScroll>
    </>
  );
};

export default MapListing;
