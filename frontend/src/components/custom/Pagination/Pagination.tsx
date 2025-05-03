import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-1 rounded-md border disabled:opacity-50 font-semibold cursor-pointer"
      >
        Previous
      </button>

      {Array.from({length:totalPages}).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-purple-900 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-1 rounded-md border disabled:opacity-50 font-semibold cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
