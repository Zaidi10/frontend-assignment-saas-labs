import { useCallback, useEffect, useState } from "react";
import "./table.css";
import Pagination from "../Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { paginateResponse } from "../../Utils";
import { tableHeaders, tableColumns } from "../../Constants/Table/index";
import { FormatedTableResponseItem } from "../../Types/Api";
import { PaginatedResponse } from "../../Types/Components/Table";

type TableData = {
  data: FormatedTableResponseItem[];
  paginationEnabled: boolean;
};

const Table = (props: TableData) => {
  const { data, paginationEnabled } = props;
  const [paginatedData, setPaginatedData] = useState<{
    items: PaginatedResponse;
    totalItems: number;
  }>(
    {} as {
      items: PaginatedResponse;
      totalItems: number;
    }
  );
  const [rowPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const setProducts = useCallback(async () => {
    const res = paginateResponse(data, rowPerPage);
    setPaginatedData(res);
  }, [rowPerPage, data]);

  const onPageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const onItemsPerPageChange = useCallback((rows: number) => {
    setRowsPerPage(rows);
  }, []);

  useEffect(() => {
    setProducts();
  }, [rowPerPage, setProducts]);

  return (
    <>
      <div className="table-container">
        <table className="table">
          <TableHead data={tableHeaders} />
          <TableBody
            rowData={
              (paginatedData.items && paginatedData.items[currentPage]) || []
            }
            columns={tableColumns}
          />
        </table>
      </div>
      {paginationEnabled ? (
        <Pagination
          totalItems={(paginatedData && paginatedData.totalItems) || 0}
          itemsPerPage={rowPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      ) : null}
    </>
  );
};

export default Table;
