
'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";
import { toast } from 'sonner'
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import { useFetchMantenimientoReports } from "@/hooks/route";

export default function ReportsMantenimiento() {

  const { reports, loading } = useFetchMantenimientoReports();

  if (loading) {
      return <Loader />;
  }


  return (    
    <>
     <Table2 reports={reports} />
      
    </>
  )
}
