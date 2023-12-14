export type ProductQueries = {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  filterValues?: Record<string, string>;
};
