import { Client } from '@googlemaps/google-maps-services-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { PlaceData } from '../../../../definitions';
import { MasjidListingRequestBody } from '../../../../lib/api';

const client = new Client({});

type MasjidListingSend = {
  results: Partial<PlaceData>[];
  nextPageToken?: string;
  statusCode?: number;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<MasjidListingSend>) => {
  const { search, page_token } = req.query as Partial<MasjidListingRequestBody>;

  try {
    const response = await client.textSearch({
      params: {
        query: search,
        pagetoken: page_token,
        region: 'my',
        key: 'AIzaSyCS2v0NPop4feGMV-ScidfHVz_cY1QQ7gI',
      },
      timeout: 1000,
    });

    if (response && response.data) {
      const { results, next_page_token } = response.data;

      res.send({ results, nextPageToken: next_page_token });
    }
  } catch (err) {
    res.status(500).json({ results: [], statusCode: 500, message: err.message });
  }
};

export default handler;
