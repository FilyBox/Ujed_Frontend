"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSession,signIn,signOut } from "next-auth/react";
import { ReportProps } from '@/types/type';
import { toast } from 'sonner'

//All reports
export const DashboardFetchReports = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/?limit=999`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, [session]);

  return { loading, reports, error };
};

//single reports
export const useFetchReport = (reportId: string) => {
  const { data: session } = useSession();
  const [report, setReport] = useState<ReportProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      if (!session || !reportId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await response.json();
        setReport(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [session, reportId]);

  return { report, loading, error };
};

export const useFetchSingleReport = (reportId: string) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<ReportProps | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (status === 'unauthenticated') {
          signIn();  // Automatically trigger sign-in
      } else if (status === 'authenticated') {
          fetchReports();
      }
  }, [status]);

  async function fetchReports() {
      if (!session) {
          console.error("No session found!");
          return;
      }

      try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.user.token}`,
              },
          });

          if (response.status === 401) {
              signOut();  // Sign out if unauthorized
              toast.error("La sesión ha caducado");
              return;
          }

          if (response.status === 403) {
              toast.error("No tienes los permisos para ver este contenido");
              return;
          }
          if (!reportId) {
            toast.error("Reporte no existente o invalido");
            return;
        }
          

          if (!response.ok) {
              throw new Error('No se pudo obtener el reporte');
          }

          const data = await response.json();
          setReport(data);
      } catch (error:any) {
          setError(error.message);
          console.error('Error fetching reports:', error);
          toast.error(error.message || 'An error occurred while fetching reports.');
      } finally {
          setLoading(false);
      }
  }

  return { report, loading, error };
};

//All reports
export const useFetchReports = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (status === 'unauthenticated') {
          signIn();  // Automatically trigger sign-in
      } else if (status === 'authenticated') {
          fetchReports();
      }
  }, [status]);

  async function fetchReports() {
      if (!session) {
          console.error("No session found!");
          return;
      }

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/?limit=999`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.user.token}`,
              },
          });

          if (response.status === 401) {
              signOut();  // Sign out if unauthorized
              toast.error("La sesión ha caducado");
              return;
          }

          if (response.status === 403) {
              toast.error("No tienes los permisos para ver este contenido");
              return;
          }

          if (!response.ok) {
              throw new Error('Failed to fetch reports');
          }

          const data = await response.json();
          setReports(data);
      } catch (error:any) {
          setError(error.message);
          console.error('Error fetching reports:', error);
          toast.error(error.message || 'An error occurred while fetching reports.');
      } finally {
          setLoading(false);
      }
  }

  return { reports, loading, error };
};

//Mantenimiento reports
export const useFetchMantenimientoReports = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (status === 'unauthenticated') {
          signIn();  // Automatically trigger sign-in
      } else if (status === 'authenticated') {
          fetchReports();
      }
  }, [status]);

  async function fetchReports() {
      if (!session) {
          console.error("No session found!");
          return;
      }

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/department/mantenimiento/?limit=999`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.user.token}`,
              },
          });

          if (response.status === 401) {
              signOut();  // Sign out if unauthorized
              toast.error("La sesión ha caducado");
              return;
          }

          if (response.status === 403) {
              toast.error("No tienes los permisos para ver este contenido");
              return;
          }

          if (!response.ok) {
              throw new Error('Failed to fetch reports');
          }

          const data = await response.json();
          setReports(data);
      } catch (error:any) {
          setError(error.message);
          console.error('Error fetching reports:', error);
          toast.error(error.message || 'An error occurred while fetching reports.');
      } finally {
          setLoading(false);
      }
  }

  return { reports, loading, error };
};

export const useFetchObrasReports = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (status === 'unauthenticated') {
          signIn();  // Automatically trigger sign-in
      } else if (status === 'authenticated') {
          fetchReports();
      }
  }, [status]);

  async function fetchReports() {
      if (!session) {
          console.error("No session found!");
          return;
      }

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/department/obras/?limit=999`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.user.token}`,
              },
          });

          if (response.status === 401) {
              signOut();  // Sign out if unauthorized
              toast.error("La sesión ha caducado");
              return;
          }

          if (response.status === 403) {
              toast.error("No tienes los permisos para ver este contenido");
              return;
          }

          if (!response.ok) {
              throw new Error('Failed to fetch reports');
          }

          const data = await response.json();
          setReports(data);
      } catch (error:any) {
          setError(error.message);
          console.error('Error fetching reports:', error);
          toast.error(error.message || 'An error occurred while fetching reports.');
      } finally {
          setLoading(false);
      }
  }

  return { reports, loading, error };
};

// uptade el estatus
export const updateReportStatus = async (reportId:string, newStatus:string, token:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.status === 401) {
      signOut();  // Sign out if unauthorized
      toast.error("La sesión ha caducado");
      return;
  }

  if (response.status === 403) {
      toast.error("No tienes los permisos para esta accion");
      return;
  }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update report');
    }
    console.log(reportId)

    console.log(newStatus)
    return data;
  } catch (error) {
    console.error('Error updating report status:', error);
    throw error;
  }
};

// Update el departament

export const updateReportDepartment = async (reportId:string, newDepartment:string, token:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}/department`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ department: newDepartment }),
    });

    if (response.status === 401) {
      signOut();  // Sign out if unauthorized
      toast.error("La sesión ha caducado");
      return;
  }

  if (response.status === 403) {
      toast.error("No tienes los permisos para esta accion");
      return;
  }
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update department');
    }
    console.log(reportId)

    console.log(newDepartment)
    return data;
  } catch (error) {
    console.error('Error updating report department:', error);
    throw error;
  }
};



export const deleteReport = async (reportId: string) => {
  const { data: session } = useSession();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer${session?.user?.token}`,
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) throw new Error('Failed to delete the report');
    return true; // Return true on successful deletion
  } catch (error) {
    console.error('Error deleting the report:', error);
    throw error; // Rethrow the error for further handling
  }
};

