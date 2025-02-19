import { ParsedUrlQuery } from "querystring";

export function getUrl(query: ParsedUrlQuery, endpoint: string) {
  if (query.filter) {
    return `${endpoint}?filter=${query.filter}&page=${query.page ? query.page : 1}`;
  }

  return `${endpoint}?page=${query.page ? query.page : 1}`;
}
