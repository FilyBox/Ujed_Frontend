"use client";
import { useState, useEffect } from "react";
import { authClient, rolesOf } from "@/lib/auth-client";
import { ReportProps } from "@/types/type";
import { toast } from "sonner";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

/** Cross-origin requests must carry the Better Auth session cookie. */
const authedInit = (init: RequestInit = {}): RequestInit => ({
  credentials: "include",
  ...init,
  headers: {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  },
});

/**
 * Handles the common auth failures. Returns true when the caller should stop
 * (the response was 401/403). On 401 the session is cleared and the user is
 * sent to /login.
 */
const handleAuthError = async (response: Response): Promise<boolean> => {
  if (response.status === 401) {
    await authClient.signOut();
    toast.error("La sesión ha caducado");
    if (typeof window !== "undefined") window.location.href = "/login";
    return true;
  }
  if (response.status === 403) {
    toast.error("No tienes los permisos para ver este contenido");
    return true;
  }
  return false;
};

//All reports
export const DashboardFetchReports = () => {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session) return;
      try {
        const response = await fetch(`${BACKEND}/reports/?limit=999`, authedInit());

        if (await handleAuthError(response)) return;

        if (!response.ok) {
          throw new Error("No tienes los permisos para ver este contenido");
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

//single report
export const useFetchReport = (reportId: string) => {
  const { data: session } = authClient.useSession();
  const [report, setReport] = useState<ReportProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      if (!session || !reportId) return;
      try {
        const response = await fetch(`${BACKEND}/reports/${reportId}`, authedInit());
        if (!response.ok) {
          throw new Error("Failed to fetch report");
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
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<ReportProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending, reportId]);

  async function fetchReport() {
    try {
      const response = await fetch(`${BACKEND}/reports/${reportId}`, authedInit());

      if (await handleAuthError(response)) return;
      if (!reportId) {
        toast.error("Reporte no existente o invalido");
        return;
      }
      if (!response.ok) {
        throw new Error("No se pudo obtener el reporte");
      }

      const data = await response.json();
      setReport(data);
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || "An error occurred while fetching reports.");
    } finally {
      setLoading(false);
    }
  }

  return { report, loading, error };
};

//All reports
export const useFetchReports = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending]);

  async function fetchReports() {
    try {
      const response = await fetch(`${BACKEND}/reports/?limit=999`, authedInit());

      if (await handleAuthError(response)) return;
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      setReports(data);
      if (data.length === 0) {
        toast.error("No hay reportes disponibles");
        return;
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || "An error occurred while fetching reports.");
    } finally {
      setLoading(false);
    }
  }

  return { reports, loading, error, fetchReports };
};

//Mantenimiento reports
export const useFetchMantenimientoReports = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending]);

  async function fetchReports() {
    try {
      const response = await fetch(
        `${BACKEND}/reports/department/mantenimiento/?limit=999`,
        authedInit(),
      );

      if (await handleAuthError(response)) return;
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      setReports(data);
      if (data.length === 0) {
        toast.error("No hay reportes disponibles");
        return;
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || "An error occurred while fetching reports.");
    } finally {
      setLoading(false);
    }
  }

  return { reports, loading, error, fetchReports };
};

export const useFetchObrasReports = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending]);

  async function fetchReports() {
    try {
      const response = await fetch(
        `${BACKEND}/reports/department/obras/?limit=999`,
        authedInit(),
      );

      if (await handleAuthError(response)) return;
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      setReports(data);
      if (data.length === 0) {
        toast.error("No hay reportes disponibles");
        return;
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message || "An error occurred while fetching reports.");
    } finally {
      setLoading(false);
    }
  }

  return { reports, loading, error };
};

// update status
export const updateReportStatus = async (reportId: string, newStatus: string) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}/status`,
      authedInit({
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      }),
    );

    if (await handleAuthError(response)) return;
    if (response.ok) {
      toast.success("Actualizado");
      return;
    }

    const data = await response.json();
    throw new Error(data.message || "Failed to update report");
  } catch (error) {
    toast.error("Error: No fue posible actualizar", { duration: 3000 });
    console.error("Error updating report status:", error);
    throw error;
  }
};

export const useFetchReportsByRole = () => {
  const { data: session, isPending } = authClient.useSession();
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (isPending) return;
      if (!session) {
        setLoading(false);
        return;
      }

      const roles = rolesOf(session.user?.role);
      if (roles.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      let url = `${BACKEND}/reports`;
      if (roles.includes("admin")) {
        url += "/?limit=999";
      } else if (roles.includes("mantenimiento")) {
        url += "/department/mantenimiento/?limit=999";
      } else if (roles.includes("obras")) {
        url += "/department/obras/?limit=999";
      }

      try {
        const response = await fetch(url, authedInit());

        if (await handleAuthError(response)) return;
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [session, isPending]);

  return { reports, loading, error };
};

// update department
export const updateReportDepartment = async (
  reportId: string,
  newDepartment: string,
) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}/department`,
      authedInit({
        method: "PATCH",
        body: JSON.stringify({ department: newDepartment }),
      }),
    );

    if (await handleAuthError(response)) return;
    if (response.ok) {
      toast.success("Actualizado");
      return;
    }

    const data = await response.json();
    throw new Error(data.message || "Failed to update department");
  } catch (error) {
    toast.error("Error: No fue posible actualizar", { duration: 3000 });
    console.error("Error updating report department:", error);
    throw error;
  }
};

export const deleteReport = async (reportId: string) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}`,
      authedInit({ method: "DELETE" }),
    );
    if (await handleAuthError(response)) return false;
    if (!response.ok) throw new Error("Failed to delete the report");
    return true;
  } catch (error) {
    console.error("Error deleting the report:", error);
    throw error;
  }
};
