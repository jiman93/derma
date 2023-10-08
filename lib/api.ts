import { AnySoaRecord } from 'dns';
import { decamelizeKeys } from 'humps';
import { stringify } from 'qs';
import { BaseResponse, OFFLINE_ERROR, PlaceData } from '../definitions';

export interface MasjidListingResponse extends BaseResponse {
  results: PlaceData[];
  nextPageToken: string;
}

export interface MasjidPhotoResponse extends BaseResponse {
  data: string;
}

export interface MasjidListingRequestBody {
  search: string;
  page_token?: string;
}

export interface MasjidPhotoRequestBody {
  reference: string;
}

const API_HOST = 'http://localhost:3000';
const API_ROOT_PATH = '/api';

/**
 * Generates a url to make an api call to our backend
 *
 * @param {string} path the path for the call
 * @param {Record<string, unknown>} parameters optional query params, {a: 1, b: 2} is parsed to "?a=1&b=2"
 * @returns {string}
 */
export const makeUrl = (path: string, parameters?: Record<string, unknown>): string => {
  if (!parameters) {
    return `${API_HOST}${API_ROOT_PATH}${path}`;
  }

  const decamelizedParams = decamelizeKeys(parameters);

  const queryParameters = `?${stringify(decamelizedParams)}`;
  return `${API_HOST}${API_ROOT_PATH}${path}${queryParameters}`;
};

export const fetcher = async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  // if the user is not online when making the API call
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(OFFLINE_ERROR);
  }
  const res = await fetch(input, init);

  if (!res.ok) {
    throw res;
  }
  const json = await res.json();
  return json;
};

export const getMasjidListing = async (
  body: MasjidListingRequestBody
): Promise<MasjidListingResponse> => fetcher(makeUrl('/googlemap/textSearch', { ...body }));

export const getPhoto = async (body: MasjidPhotoRequestBody): Promise<MasjidPhotoResponse> =>
  fetcher(makeUrl('/googlemap/placePhoto', { ...body }));
