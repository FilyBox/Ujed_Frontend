"use client";
import { useQuery } from "@tanstack/react-query";
import { authClient, rolesOf } from "@/lib/auth-client";
import { ReportProps } from "@/types/type";
import { toast } from "sonner";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const authedInit = (
  init: RequestInit = {},
  token?: string | null,
): RequestInit => ({
  credentials: "include",
  ...init,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init.headers ?? {}),
  },
});

/** Throws on 401/403 so useQuery puts the query in error state. */
const throwOnAuthError = async (response: Response): Promise<void> => {
  if (response.status === 401) {
    await authClient.signOut();
    toast.error("La sesión ha caducado");
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Sesión caducada");
  }
  if (response.status === 403) {
    toast.error("No tienes los permisos para ver este contenido");
    throw new Error("Sin permisos");
  }
};

/** Used by mutations (non-query fetches) — returns boolean instead of throwing. */
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

// ─── Paginated list hooks ────────────────────────────────────────────────────

export const useFetchReports = (page: number = 1, limit: number = 10) => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reports", "all", page, limit],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `${BACKEND}/reports/?limit=${limit}&offset=${offset}`,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok) throw new Error("Error al obtener los reportes");
      return response.json() as Promise<{ data: ReportProps[]; total: number }>;
    },
    enabled: !!session && !sessionPending,
    retry: false,
  });

  return {
    reports: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    fetchReports: refetch,
  };
};

export const useFetchMantenimientoReports = (
  page: number = 1,
  limit: number = 10,
) => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reports", "mantenimiento", page, limit],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `${BACKEND}/reports/department/mantenimiento/?limit=${limit}&offset=${offset}`,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok) throw new Error("Error al obtener los reportes");
      return response.json() as Promise<{ data: ReportProps[]; total: number }>;
    },
    enabled: !!session && !sessionPending,
    retry: false,
  });

  return {
    reports: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    fetchReports: refetch,
  };
};

export const useFetchObrasReports = (page: number = 1, limit: number = 10) => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reports", "obras", page, limit],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `${BACKEND}/reports/department/obras/?limit=${limit}&offset=${offset}`,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok) throw new Error("Error al obtener los reportes");
      return response.json() as Promise<{ data: ReportProps[]; total: number }>;
    },
    enabled: !!session && !sessionPending,
    retry: false,
  });

  return {
    reports: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    fetchReports: refetch,
  };
};

// ─── Single report ───────────────────────────────────────────────────────────

export const useFetchSingleReport = (reportId: string) => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const {
    data: report,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["report", reportId],
    queryFn: async () => {
      const response = await fetch(
        `${BACKEND}/reports/${reportId}`,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok) throw new Error("No se pudo obtener el reporte");
      return response.json() as Promise<ReportProps>;
    },
    enabled: !!session && !sessionPending && !!reportId,
    retry: false,
  });

  return { report: report ?? null, loading, error: error?.message ?? null };
};

// Kept for backward compatibility with useFetchReport callers
export const useFetchReport = useFetchSingleReport;

// ─── Dashboard summary (no pagination needed) ────────────────────────────────

export const DashboardFetchReports = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["reports", "dashboard"],
    queryFn: async () => {
      const response = await fetch(
        `${BACKEND}/reports/?limit=999`,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok) throw new Error("Error al obtener los reportes");
      return response.json() as Promise<ReportProps[]>;
    },
    enabled: !!session && !sessionPending,
    retry: false,
  });

  return { reports: data ?? [], loading, error: error?.message ?? null };
};

export const useFetchReportsByRole = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["reports", "by-role", session?.user?.roles],
    queryFn: async () => {
      const roles = rolesOf(session?.user?.roles);
      let url = `${BACKEND}/reports`;
      if (roles.includes("admin")) {
        url += "/?limit=999";
      } else if (roles.includes("mantenimiento")) {
        url += "/department/mantenimiento/?limit=999";
      } else if (roles.includes("obras")) {
        url += "/department/obras/?limit=999";
      }
      const response = await fetch(
        url,
        authedInit({}, session?.session?.token),
      );
      await throwOnAuthError(response);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json() as Promise<ReportProps[]>;
    },
    enabled:
      !!session && !sessionPending && rolesOf(session?.user?.roles).length > 0,
    retry: false,
  });

  return { reports: data ?? [], loading, error: error?.message ?? null };
};

// ─── Mutations ───────────────────────────────────────────────────────────────

export const updateReportStatus = async (
  reportId: string,
  newStatus: string,
  token?: string | null,
) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}/status`,
      authedInit(
        { method: "PATCH", body: JSON.stringify({ status: newStatus }) },
        token,
      ),
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
    throw error;
  }
};

export const updateReportDepartment = async (
  reportId: string,
  newDepartment: string,
  token?: string | null,
) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}/department`,
      authedInit(
        {
          method: "PATCH",
          body: JSON.stringify({ department: newDepartment }),
        },
        token,
      ),
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
    throw error;
  }
};

export const deleteReport = async (reportId: string, token?: string | null) => {
  try {
    const response = await fetch(
      `${BACKEND}/reports/${reportId}`,
      authedInit({ method: "DELETE" }, token),
    );
    if (await handleAuthError(response)) return false;
    if (!response.ok) throw new Error("Failed to delete the report");
    return true;
  } catch (error) {
    console.error("Error deleting the report:", error);
    throw error;
  }
};
