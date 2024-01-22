import { useState } from 'react';

type Pagination = {
  page: number;
  perPage: number;
  _changePage: (page: number) => void;
  _changePerPage: (perPage: number) => void;
};

export const usePagination = (): Pagination => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);

  const _changePage = (newPage: number) => setPage(newPage);

  const _changePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  return {
    page,
    perPage,
    _changePage,
    _changePerPage,
  };
};
