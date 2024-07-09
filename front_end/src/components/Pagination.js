import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const pageRange = calculateVisiblePages(totalPages, currentPage);
    setVisiblePages(pageRange);
  }, [totalPages, currentPage]); // Update on totalPages or currentPage change

  const calculateVisiblePages = (totalPages, currentPage) => {
    const MAX_VISIBLE_PAGES = 3; // Adjust this value to control how many pages are shown around the current page
    const visibleStart = Math.max(
      Math.min(currentPage - 1, totalPages - MAX_VISIBLE_PAGES),
      1
    ); // Clamp visible start between 1 and totalPages - MAX_VISIBLE_PAGES
    const visibleEnd = Math.min(
      visibleStart + MAX_VISIBLE_PAGES - 1,
      totalPages
    ); // Clamp visible end between visibleStart + MAX_VISIBLE_PAGES - 1 and totalPages

    const pageRange = [];
    for (let i = visibleStart; i <= visibleEnd; i++) {
      pageRange.push(i);
    }

    return pageRange;
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setVisiblePages(calculateVisiblePages(totalPages, pageNumber)); // Update visible pages on page change
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex items-center justify-center my-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`${pageNumber === currentPage ? "font-bold" : ""} mx-2`}
        >
          {pageNumber}
        </button>
      ))}
      {totalPages > visiblePages.length && <span className="mx-2">...</span>}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
