"use client";

import { useState, useEffect, useCallback } from 'react';
import { authClient } from "@/lib/auth-client";
import { UserProps, UpdateUserData } from '@/types/type';
import { toast } from 'sonner'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const authedInit = (init: RequestInit = {}): RequestInit => ({
  credentials: "include",
  ...init,
  headers: {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  },
});

const handleAuthError = async (response: Response): Promise<boolean> => {
  if (response.status === 401) {
    await authClient.signOut();
    toast.error("La sesión ha caducado");
    if (typeof window !== "undefined") window.location.href = "/login";
    return true;
  }
  if (response.status === 403) {
    toast.error("No tienes los permisos para esta accion");
    return true;
  }
  return false;
};

export const useUserData = (): { userData: UserProps | null, loading: boolean } => {

  const { data: session } = authClient.useSession();
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        setLoading(true);
        try {
          const response = await fetch(`${BACKEND}/users/${session.user.id}`, authedInit());
          if (await handleAuthError(response)) return;

          const data = await response.json();
          if (response.ok) {
            setUserData(data);
          } else {
            throw new Error(data.message || "Unable to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  return { userData, loading };
};


// useUserUpdate
export const useUserUpdate = () => {
    const { data: session } = authClient.useSession();

    const updateUserData = useCallback(async (data: UpdateUserData) => {
        if (session?.user?.id) {
            try {
                const response = await fetch(`${BACKEND}/users/${session.user.id}`, authedInit({
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: data?.name,
                        last_name: data?.last_name,
                    }),
                }));

                if (await handleAuthError(response)) return;

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "Unable to update user data");
                }
                return result;
            } catch (error) {
                console.error("Error updating user data:", error);
                throw error;
            }
        } else {
            throw new Error("No user session available");
        }
    }, [session]);

    return { updateUserData };
};



export const useDeleteUser = () => {
  const { data: session } = authClient.useSession();

  const deleteUser = async () => {
    if (!session) {
      console.error("No session found!");
      return;
    }

    try {
      const response = await fetch(`${BACKEND}/users/${session.user.id}`, authedInit({
        method: 'DELETE',
      }));

      if (await handleAuthError(response)) return;

      if (!response.ok) {
          throw new Error('Failed to delete the user');
      }

      toast.success("Cuenta eliminada");
      await authClient.signOut();
      if (typeof window !== "undefined") window.location.href = "/login";
    } catch (error:any) {
      console.error('Error deleting user:', error);
      toast.error("Error: " + (error.message || 'An unknown error occurred'));
    }
  };

  return deleteUser;
};
