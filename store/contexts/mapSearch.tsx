import { createContext } from 'react';
import { PlaceData } from '../../definitions';

export type Coordinate = {
  lng: number;
  lat: number;
};

type MapSearchContext = {
  stateName: string;
  onSetStateName?: (s: string) => void;
  coordinate: Coordinate;
  onSetCoordinate?: (c: Coordinate) => void;
  district: string;
  onSetDistrict?: (d: string) => void;
  listData: PlaceData[];
  onSetListData?: (p: PlaceData[]) => void;
  selectedData: PlaceData;
  onSetSelectedData?: (p: PlaceData) => void;
  nextPageToken: string;
  onSetNextPageToken?: (t: string) => void;
};

const mapSearch: MapSearchContext = {
  stateName: '',
  coordinate: { lng: 0, lat: 0 },
  district: '',
  listData: [],
  selectedData: null,
  nextPageToken: '',
};

export const MapSearchContext = createContext<MapSearchContext>(mapSearch);
