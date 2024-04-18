
'use client';

import React from "react";
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";

import { useFetchObrasReports } from "@/hooks/route";
import List from "../components/List";

export default function ReportsObras() {

  const { reports, loading } = useFetchObrasReports();

  if (loading) {
      return <Loader />;
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
