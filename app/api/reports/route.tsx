"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSession,signIn,signOut } from "next-auth/react";
import { ReportProps } from '@/types/type';
import { toast } from 'sonner'


export const DashboardFetchReports = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports`, {
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.user.token}`,
              },
          });

          if (response.status === 401) {
              signOut();  // Sign out if unauthorized
              toast.error("You have been logged out due to authentication failure.");
              return;
          }

          if (response.status === 403) {
              toast.error("You do not have the necessary permissions to view this content.");
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

// api/updateReportStatus.js

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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update report');
    }
    return data;
  } catch (error) {
    console.error('Error updating report status:', error);
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

