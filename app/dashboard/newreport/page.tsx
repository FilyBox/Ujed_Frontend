
'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";
import { toast } from 'sonner'
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import { useFetchReports } from "@/hooks/route";
import List from "../components/List";
export default function NewReport() {

  const { reports, loading } = useFetchReports();
  const department = "ninguno";
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
