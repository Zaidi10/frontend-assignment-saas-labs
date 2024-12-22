import { FormatedTableResponseItem } from "../../Api";

export type PaginatedResponse = Record<string, FormatedTableResponseItem[]>;

export type PaginatedResponse2 = {
  items: Record<string, FormatedTableResponseItem[]>;
  totalItems: Number;
};
