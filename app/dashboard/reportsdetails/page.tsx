
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Content from './components/Content';
import Loader from '@/components/ui/Loader';
import { ReportProps } from '@/types/type';

export default function ReportDetails({}) {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  const { data: session, status } = useSession();

  const [report, setReport] = useState<ReportProps | null>(null); // Utiliza el tipo definido
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (session) {
      fetchReport();
    }
  }, [session]);

  async function fetchReport() {
    if (search && typeof search === 'string') { // Asegúrate de que 'id' es un string
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${search}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const data: ReportProps = await response.json(); // Asegúrate de que la respuesta se trata como ReportProps
        setReport(data);
        setLoading(false);

      } catch (error) {
        console.error('Failed to fetch report:', error);
      }
    }
  };

  if (!report) {
    return  <Loader />;
  }

  return (
    
    <>
      <Content report={report}/>
      </>
  );
};

