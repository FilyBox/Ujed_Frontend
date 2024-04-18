
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchMantenimientoReports } from "@/hooks/route";

export default function ReportsMantenimiento() {

  const { reports, loading } = useFetchMantenimientoReports();

  if (loading) {
      return <Loader />;
  }
  console.log("reporteeees")

  return (    
    <>
     <Table2 reports={reports} />
      
    </>
  )
}
