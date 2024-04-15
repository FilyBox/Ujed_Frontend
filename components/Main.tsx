"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    
      router.push('/dashboard');
   
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez, al montar el componente

  return null; // Devolvemos null para evitar renderizar el contenido de la página principal
}
