import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut,signIn } from "next-auth/react";
import { UserProps, UpdateUserData } from '@/types/type';
import { toast } from 'sonner'

export const useUserData = (): { userData: UserProps | null, loading: boolean } => {

  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session.user.id}`, {
            headers: {
              'Authorization': `Bearer ${session.user.token}`,  // Asegúrate de que el token se envía correctamente
              'Content-Type': 'application/json'
            }
          });
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
    const { data: session } = useSession();

    // La función ahora acepta un objeto de tipo UpdateUserData
    const updateUserData = useCallback(async (data: UpdateUserData) => {
        if (session?.user?.id && session.user.token) {
            try {
                console.log("data edit:",data);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session.user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${session.user.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data?.name,
                        last_name: data?.last_name,
                      }),
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "Unable to update user data");
                }
                console.log("Update successful", result);
                return result;
            } catch (error) {
                console.error("Error updating user data:", error);
                throw error; // Propagate the error up if needed
            }
        } else {
            throw new Error("No user session available");
        }
    }, [session]);

    return { updateUserData };
};



export const useDeleteUser = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();  // Automatically trigger sign-in if not authenticated
    }
  }, [status]);

  const deleteUser = async () => {
    if (!session) {
      console.error("No session found!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session.user.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        signOut();  // Sign out if unauthorized or forbidden
        toast.error("Session expired or access forbidden. Signing out.");
        return;
      }

      if (!response.ok) {
          throw new Error('Failed to delete the user');
      }

      toast.success("Cuenta eliminada");
      signOut(); // Optionally sign out after deleting
    } catch (error:any) {
      console.error('Error deleting user:', error);
      toast.error("Error: " + (error.message || 'An unknown error occurred'));
    }
  };

  return deleteUser;
};