import { ParsedUrlQuery } from "querystring";

export function getUrl(
  query: ParsedUrlQuery,
  endpoint: string,
  type?: "admin" | "public",
) {
  if (type === "admin" ? query.q : query.filter) {
    return `${endpoint}?${type === "admin" ? `q=${query.q}` : `filter=${query.filter}`}&page=${query.page ? query.page : 1}`;
  }

  return `${endpoint}?page=${query.page ? query.page : 1}`;
}
