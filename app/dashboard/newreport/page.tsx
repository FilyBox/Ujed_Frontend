'use client';

import { useState } from "react";
import Table2 from "../components/Table2";
import { useFetchReports } from "@/hooks/route";
import List from "../components/List";
import TableSkeleton from "../components/TableSkeleton";
import ListSkeleton from "../components/ListSkeleton";

export default function NewReport() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { reports, total, loading, fetchReports } = useFetchReports(page, limit);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (loading) {
    return (
      <>
        <div className="hidden sm:block"><TableSkeleton /></div>
        <div className="block sm:hidden"><ListSkeleton /></div>
      </>
    );
  }

  return (
    <>
      <div className="hidden sm:block">
        <Table2
          reports={reports as any}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={handleLimitChange}
          onDataChange={fetchReports}
        />
      </div>
      <div className="block sm:hidden">
        <List reports={reports as any} onDataChange={fetchReports} />
      </div>
    </>
  );
}
