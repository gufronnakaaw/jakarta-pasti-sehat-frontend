export type Article = {
  article_id: string;
  slug: string;
  pillar: string;
  subpillar: string;
  content: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  created_by: string;
  reading_time: string;
  is_active: boolean;
};

export type AdminArticle = {
  article_id: string;
  slug: string;
  pillar: string | { pillar_id: string; name: string };
  subpillar: string | { sub_pillar_id: string; name: string };
  content: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  created_by: string;
  reading_time: string;
  is_active: boolean;
};
