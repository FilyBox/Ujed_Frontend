
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/Loader';
import { DashboardFetchReports } from '../api/reports/route';
import { toast } from 'sonner';

export default function Dashboard() {
  const { loading, reports, error } = DashboardFetchReports();

  if (loading) return <Loader />;

  if (error) return toast.error(
    <div className="alert alert-danger">
      {error}
    </div>,
    { duration: 3000 }
  );

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Dashboard</h2>
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Tarjeta de Total de Reportes */}
          <Card className='col-span-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-medium">
                Total De Reportes
              </CardTitle>
              <div className="text-2xl font-bold">
                {reports.length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Total de reportes disponibles
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta de Reportes Asignados */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reportes Asignados
              </CardTitle>
              <div className="text-2xl font-bold">
                {reports.filter(report => report.status === 'asignado').length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Número de reportes asignados
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta de Reportes en Espera */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reportes en Espera
              </CardTitle>
              <div className="text-2xl font-bold">
                {reports.filter(report => report.status === 'en espera').length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Número de reportes en espera
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta de Reportes Resueltos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reportes Resueltos
              </CardTitle>
              <div className="text-2xl font-bold">
                {reports.filter(report => report.status === 'resuelto').length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Número de reportes resueltos
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta de Reportes Descartados */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reportes Descartados
              </CardTitle>
              <div className="text-2xl font-bold">
                {reports.filter(report => report.status === 'descartado').length}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Número de reportes descartados
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
