
'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import Content from './components/Content';
import Loader from '@/components/ui/Loader';
import { useFetchSingleReport } from '@/hooks/route';

function ReportDetailsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('id') ?? '';

  const { report, loading, error } = useFetchSingleReport(search);

  if (loading || error || !report) {
    return <Loader />;
  }

  return <Content report={report} />;
}

export default function ReportDetails() {
  return (
    <Suspense fallback={<Loader />}>
      <ReportDetailsContent />
    </Suspense>
  );
}
