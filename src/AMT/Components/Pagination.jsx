import { useEffect, useMemo, useState } from "react";

const Pagination = ({
  perPage = 0,
  itemCount = 0,
  onChangePageCallback = (page) => null,
  currentPage = 1,
}) => {
  const [page, setPage] = useState(currentPage);

  const page_numbers = useMemo(
    () => Math.ceil(itemCount / perPage),
    [itemCount, perPage]
  );

  const [Numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers([]);
    const currentPage = page;
    const totalPages = page_numbers;

    const startPage = Math.max(currentPage - 10, 1);
    const endPage = Math.min(currentPage + 10, totalPages);

    for (let index = startPage; index <= endPage; index++) {
      setNumbers((prev) => [
        ...prev,
        <li
          className={" page-item"}
          onClick={() => {
            onChangePageCallback(index);
            setPage((prev) => index);
          }}
          key={index}
        >
          <a
            href="#!"
            className={currentPage === index ? "page-link active" : "page-link"}
          >
            {index}
          </a>
        </li>,
      ]);
    }
  }, [page_numbers, page, onChangePageCallback]);
  return (
    <nav className="mt-4 mb-3">
      <ul className="pagination justify-content-center">{Numbers}</ul>
    </nav>
  );
};

export default Pagination;
