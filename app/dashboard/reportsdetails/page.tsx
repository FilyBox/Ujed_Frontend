
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Content from './components/Content';
import Loader from '@/components/ui/Loader';
import { ReportProps } from '@/types/type';
import { useFetchSingleReport } from '@/hooks/route';

export default function ReportDetails({}) {

  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  const department = searchParams.get('department')


  const { report, loading, error } = search ? useFetchSingleReport(search) : { report: null, loading: false, error: null };


  const { data: session, status } = useSession();

  if (session){
    
    console.log(session.user.roles)
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }



  if (!report) {
    return <Loader />;
  }

  return <Content report={report} />;
}

