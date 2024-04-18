
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
  const { report, loading, error } = search ? useFetchSingleReport(search) : { report: null, loading: false, error: null };

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

