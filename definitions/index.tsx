export const OFFLINE_ERROR = 'OFFLINE';

export interface BaseResponse {
  status?: number;
  error?: string;
}

export interface PlaceData {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}
