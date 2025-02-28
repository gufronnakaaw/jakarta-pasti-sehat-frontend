export type Pillar = {
  pillar_id: string;
  name: string;
  created_at: string;
};

export type PillarDetails = {
  pillar_id: string;
  name: string;
  created_at: string;
  subpillars: {
    sub_pillar_id: string;
    name: string;
    created_at: string;
  }[];
  can_delete: boolean;
};
