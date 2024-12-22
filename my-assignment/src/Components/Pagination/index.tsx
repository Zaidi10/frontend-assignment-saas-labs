import { useCallback, useEffect, useMemo, useState } from "react";
import "./Pagination.css";
import Dropdown from "../DropDown";
import { rowOptions } from "../../Constants/Pagination";

type PaginatedData = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

const Pagination = (props: PaginatedData) => {
  const { totalItems, itemsPerPage, onPageChange, onItemsPerPageChange } =
    props;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    },
    [onPageChange, totalPages]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages) {
      handlePageChange(totalPages);
    }
  }, [itemsPerPage, currentPage, totalPages, handlePageChange]);

  const generatePageNumbers = useCallback(() => {
    const range = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  const pageNumbers = useMemo(
    () => generatePageNumbers(),
    [generatePageNumbers]
  );

  return (
    <div>
      <div className="pagination-container">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          data-testid={"previous"}
        >
          Previous
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-btn ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            aria-label={`Go to page ${pageNumber}`}
            data-testid={`page-${pageNumber}`}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <span className="pagination-ellipsis">...</span>
        )}

        <button
          className={`pagination-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          data-testid={"next"}
        >
          Next
        </button>
      </div>
      <div className="dropdownWrapper">
        <label htmlFor="itemsPerPageDropdown" className="dropdownLable">
          Rows per page:{" "}
        </label>
        <Dropdown
          options={rowOptions}
          onSelect={onItemsPerPageChange}
          preSelectedOption={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
