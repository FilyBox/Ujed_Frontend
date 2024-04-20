
'use client';

import React from 'react';
import Loader from '@/components/ui/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchReportsByRole } from '@/hooks/route';

export default function Dashboard() {
  const { reports, loading, error } = useFetchReportsByRole();

  if (loading) return <Loader />;
  if (error) return <p>Errors occurred: {error}</p>;

  const reportCount = (status: string) => reports.filter(report => report.status === status).length;


  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Dashboard</h2>
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className='col-span-2'>
            <CardHeader  className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Total de reportes</CardTitle>
              <div className="text-2xl font-bold">{reports.length}</div>
            </CardHeader>
            <CardContent>
              Total de reportes disponibles
            </CardContent>
          </Card>
          {['asignado', 'en espera', 'resuelto', 'descartado'].map(status => (
            <Card key={status}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reportes {status}</CardTitle>
                <div>{reportCount(status)}</div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Número de reportes {status}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
