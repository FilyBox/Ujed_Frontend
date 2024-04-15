import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const RedirectHandler = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [session, router]);

  // Devolver null o cualquier otro contenido si es necesario
  return null;
};

export default RedirectHandler;
