export type Homepage = {
  articles: {
    article_id: string;
    slug: string;
    pillar: string;
    subpillar: string;
    content: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    reading_time: string;
  }[];
  banners: {
    banner_id: string;
    alt?: string;
    description?: string;
    image_url: string;
    link: string;
  }[];
  events: {
    event_id: string;
    slug: string;
    image_url: string;
    title: string;
    start: string;
    end: string;
    pillar: string;
    subpillar: string;
    status: string;
  }[];
  teams: {
    team_id: string;
    fullname: string;
    image_url: string;
    position: string;
  }[];
  partners: {
    partner_id: string;
    alt?: string;
    description?: string;
    image_url: string;
  }[];
};
