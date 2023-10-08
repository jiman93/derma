import { Client } from '@googlemaps/google-maps-services-js';
import { MasjidPhotoRequestBody } from '../../../../lib/api';

const client = new Client({});

export default async function handler(req, res) {
  const { reference } = req.query as Partial<MasjidPhotoRequestBody>;

  try {
    const response = await client.placePhoto({
      params: {
        photoreference: reference,
        maxheight: 200,
        maxwidth: 200,
        key: 'AIzaSyCS2v0NPop4feGMV-ScidfHVz_cY1QQ7gI',
      },

      timeout: 1000,
      responseType: 'arraybuffer',
    });

    if (!response.data) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const base64Data = Buffer.from(response.data).toString('base64');

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ image: `data:image/jpeg;base64,${base64Data}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
