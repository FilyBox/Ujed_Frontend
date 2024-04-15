import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const UnauthorizedUMessage = () => {

  const handleChangeUser = () => {
    signOut();
  };

  return (
    <div className="alert alert-danger flex flex-col">
      Usuario no autorizado para ver contenido
      <button
        onClick={handleChangeUser}
        className="w-full bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Cambiar de usuario
      </button>
    </div>
  );
};

export default UnauthorizedUMessage;
