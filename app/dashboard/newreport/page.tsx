
'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Table2 from "../components/Table2";
import Loader from "@/components/ui/Loader";
import { toast } from 'sonner'
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import { useFetchReports } from "@/app/api/reports/route";
export default function NewReport() {

  const { reports, loading } = useFetchReports();

  if (loading) {
      return <Loader />;
  }


  return (    
    <>
     <Table2 reports={reports} />
      
    </>
  )
}