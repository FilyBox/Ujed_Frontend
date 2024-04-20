
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchObrasReports } from "@/hooks/route";
import List from "../components/List";
import TableSkeleton from "../components/TableSkeleton";
import ListSkeleton from "../components/ListSkeleton";

export default function ReportsObras() {

  const { reports, loading, error } = useFetchObrasReports();

  if (loading || error) {
    return <>

    <div className="hidden sm:block">
    <TableSkeleton />
    </div>

    <div className="block sm:hidden">
      <ListSkeleton  />

    </div>

      
    </>
  }

  // Check if reports array is empty
  if (!reports || reports.length === 0) {
    
    return   <>

    <div className="hidden sm:block">
    <TableSkeleton />
    </div>

    <div className="block sm:hidden">
      <ListSkeleton />

    </div>

      
    </>
  }



  return (    
    <>
    <div className="hidden sm:block">
      <Table2 reports={reports} />

    </div>

    <div className="block sm:hidden">
      <List reports={reports}/>

    </div>
    </>
  )
}
