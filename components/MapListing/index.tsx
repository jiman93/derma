import { Box, Code, Table, Text, Image, Flex, Paper, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMasjidListing, getPhoto } from '../../lib/api';
import { MapSearchContext } from '../../store/contexts/mapSearch';

const MapListing = () => {
  const {
    listData,
    selectedData,
    onSetSelectedData,
    onSetListData,
    onSetNextPageToken,
    nextPageToken,
    searchText,
    onSetHoveredMarker,
  } = useContext(MapSearchContext);

  const { hovered, ref } = useHover();
  const [imagePath, setImagePath] = useState('');

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
    try {
      const search = searchText;
      const response = await getMasjidListing({ search, page_token: nextPageToken });
      const { results, nextPageToken: pageToken } = response;

      onSetListData([...listData, ...results]);
      onSetNextPageToken(pageToken);
    } catch (err) {
      console.log('Failed: getMasjidListing');
    }
  };

  const rows = listData.map((element) => (
    <Table.Tr key={element.place_id}>
      <Box
        px="sm"
        pb="xs"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onSetHoveredMarker(element, true)}
        onMouseLeave={() => onSetHoveredMarker(element, false)}
        onClick={() => {
          onSetSelectedData(element);
        }}
      >
        <Text>{element.name}</Text>
        <Text>
          {element.user_ratings_total} <Code>{element.rating}</Code>
        </Text>
      </Box>
    </Table.Tr>
  ));

  return (
    <>
      {selectedData && (
        <Paper shadow="xs" p="sm">
          <Text size="md" fw="bolder" display="inline-flex">
            <Link href={`/masjid/${selectedData.place_id}`}>
              <Box ref={ref} style={{ cursor: 'pointer', textDecoration: hovered && 'underline' }}>
                {selectedData.name}
              </Box>
            </Link>
          </Text>
          <Group grow>
            <Image src={imagePath} alt="masjid preview" width={150} height={100} />
            <Box>
              <Text size="xs">{selectedData.formatted_address}</Text>
              <Text size="xs">Rating: {selectedData.user_ratings_total}</Text>
            </Box>
          </Group>
        </Paper>
      )}

      <Flex mb="xs" mr="lg" justify="space-around">
        <Text>Masjid number: {listData.length}</Text>
      </Flex>

      <InfiniteScroll
        height={600}
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
        <Table highlightOnHover withRowBorders striped>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </InfiniteScroll>
    </>
  );
};

export default MapListing;
