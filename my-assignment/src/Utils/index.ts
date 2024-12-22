import { TableResponseItem, FormatedTableResponseItem } from "../Types/Api";
import { PaginatedResponse } from "../Types/Components/Table";

export const paginateResponse = (
  updatedResponse: FormatedTableResponseItem[],
  rowPerPage: number
): { items: PaginatedResponse; totalItems: number } => {
  const paginatedResponse: PaginatedResponse = {} as PaginatedResponse;
  let pageNumber = 1;
  let count = 1;
  updatedResponse.forEach((item) => {
    if (!paginatedResponse[pageNumber]) {
      paginatedResponse[pageNumber] = [];
    }
    if (count > rowPerPage) {
      count = 1;
      pageNumber++;
      paginatedResponse[pageNumber] = [];
    }
    paginatedResponse[pageNumber] = [...paginatedResponse[pageNumber], item];
    count++;
  });
  return { items: paginatedResponse, totalItems: updatedResponse.length };
};

export const fetchTableData = async (
  url: string
): Promise<FormatedTableResponseItem[]> => {
  return fetch(url)
    .then(async (res) => {
      return res
        .json()
        .then((response) => {
          const updatedResponse = response.map((item: TableResponseItem) => {
            return {
              id: item["s.no"],
              sNo: item["s.no"],
              percentageFunded: item["percentage.funded"],
              amountPleged: item["amt.pledged"],
              country: item["country"],
              state: item["state"],
              title: item["title"],
            };
          });
          return updatedResponse;
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch(() => {
      throw new Error("Something Went Wrong.");
    });
};
