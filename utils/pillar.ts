export function getPillarId(
  pillar: string | { pillar_id: string; name: string } | undefined,
) {
  return typeof pillar === "object" ? pillar.pillar_id : null;
}

export function getSubPillarId(
  subpillar: string | { sub_pillar_id: string; name: string } | undefined,
) {
  return typeof subpillar === "object" ? subpillar.sub_pillar_id : null;
}

export function getPillarName(
  pillar: string | { pillar_id: string; name: string } | undefined,
) {
  return typeof pillar === "object" ? pillar.name : "Lainnya";
}

export function getSubPillarName(
  subpillar: string | { sub_pillar_id: string; name: string } | undefined,
) {
  return typeof subpillar === "object" ? subpillar.name : "Lainnya";
}
