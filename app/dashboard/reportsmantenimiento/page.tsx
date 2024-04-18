
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchMantenimientoReports } from "@/hooks/route";
import List from "../components/List";

export default function ReportsMantenimiento() {

  const { reports, loading } = useFetchMantenimientoReports();

  if (loading) {
      return <Loader />;
  }
  console.log("reporteeees")

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
