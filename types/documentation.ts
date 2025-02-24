export type Documentation = {
  doc_id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  created_at: string;
  pillar: string;
  subpillar: string;
  doc_images: {
    doc_image_id: string;
    image_url: string;
  }[];
};

export type DocumentationAdmin = {
  doc_id: string;
  slug: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  is_active: boolean;
  pillar: string;
  subpillar: string;
};
