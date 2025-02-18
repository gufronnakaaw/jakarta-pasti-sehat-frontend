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
