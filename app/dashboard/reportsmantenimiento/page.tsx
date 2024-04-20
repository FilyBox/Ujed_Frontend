
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchMantenimientoReports } from "@/hooks/route";
import List from "../components/List";
import TableSkeleton from "../components/TableSkeleton";
import { toast } from "sonner";
import ListSkeleton from "../components/ListSkeleton";

export default function ReportsMantenimiento() {

  const { reports, loading,error, fetchReports } = useFetchMantenimientoReports();

  const handleRefresh = () => {
    fetchReports();  // Call this function when you want to refresh data
  };

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
      <Table2 reports={reports}  onDataChange={handleRefresh}/>

    </div>

    <div className="block sm:hidden">
      <List reports={reports}  onDataChange={handleRefresh}/>

    </div>
      
    </>
  )
}
