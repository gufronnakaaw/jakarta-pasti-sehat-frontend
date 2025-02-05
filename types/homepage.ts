export type Homepage = {
  articles: [];
  banners: {
    banner_id: string;
    alt?: string;
    description?: string;
    image_url: string;
  }[];
  events: [];
  teams: [];
  partners: {
    partner_id: string;
    alt?: string;
    description?: string;
    image_url: string;
  }[];
};
