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

export type EventDashboard = {
  event_id: string;
  slug: string;
  image_url: string;
  title: string;
  start: string;
  end: string;
  created_at: string;
  created_by: string;
  pillar: string;
  subpillar: string;
  status: string;
  is_active: boolean;
};

export type EventDashboardDetail = {
  event_id: string;
  slug: string;
  type: string;
  image_url: string;
  title: string;
  start: string;
  end: string;
  location: string;
  detail: string;
  map_url: string;
  payment_url: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
  pillar: string | { pillar_id: string; name: string };
  subpillar: string | { sub_pillar_id: string; name: string };
};
