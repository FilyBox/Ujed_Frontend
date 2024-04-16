
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchObrasReports } from "@/hooks/route";

export default function ReportsObras() {

  const { reports, loading } = useFetchObrasReports();

  if (loading) {
      return <Loader />;
  }


  return (    
    <>
     <Table2 reports={reports} />
      
    </>
  )
}
