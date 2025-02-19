export type Event = {
  event_id: string;
  slug: string;
  image_url: string;
  title: string;
  start: string;
  end: string;
  pillar: string;
  subpillar: string;
  status: string;
};

export type EventDetail = {
  event_id: string;
  slug: string;
  type: string;
  image_url: string;
  title: string;
  start: string;
  end: string;
  location: string;
  detail: string;
  map_url?: string;
  payment_url?: string;
  pillar: string;
  subpillar: string;
};
