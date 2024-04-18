"use client";

import React, { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/user/route'; // Asegúrate de que useUserData está definido correctamente
import { useUserUpdate } from '@/hooks/user/route';
import Loader from '@/components/ui/Loader';
import { toast } from 'sonner'
import { Button, Skeleton,Input  } from '@nextui-org/react';
import { Card } from '@/components/ui/card';
import { useSession } from "next-auth/react";

const EditProfilePage = () => {
    const { userData, loading } = useUserData();
    const { updateUserData } = useUserUpdate();
    const { update } = useSession();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    // Actualizar los estados cuando se carguen los datos del usuario
    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setLastName(userData.last_name);
        }
    }, [userData]);

    const handleSave = async () => {
        try {
            const result = await updateUserData({ name, last_name: lastName });
            console.log("Update successful", result);
            toast.success("Información actualizada!");
            update({ name: name })

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error("No fue posible actualizar:" + errorMessage);

        }
    };

    if (loading || !userData) return <Card className=" shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto my-10 p-6" >
        <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
        </div>
        <div className="border-t border-gray-200">
            <dl>
            
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                    <Input 
                            type="text"
                            isDisabled
                            id="name"
                            variant="bordered"

                            value={"Nombre"}
                            className="sm:col-span-2 block w-full  "
                        />
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Apellido</dt>
                     <Input 
                            type="text"
                            isDisabled
                            id="lastName"
                            variant="bordered"

                            value={"Apellido"}
                            className="sm:col-span-2 block w-full  "
                        />
                </div>
            </dl>
        </div>
        <div className="px-4 py-3 sm:px-6 flex flex-row items-center sm:flex sm:flex-row-reverse justify-between">
             <Button isDisabled className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Guardar Cambios
            </Button>

            <div className="  animate-spin rounded-full border-t-2 border-r-2 border-blue-500 border-solid h-8 w-8"></div>
        </div>
</Card>;


    return (

        <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto my-10 p-6">
        <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
        </div>
        <div className="border-t border-gray-200">
            <dl>
            
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                    <Input 
                            type="text"
                            id="name"
                            value={name}
                            variant="bordered"

                            onChange={(e) => setName(e.target.value)}
                            className="sm:col-span-2 block w-full "
                        />
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Apellido</dt>
                     <Input 
                            type="text"
                            id="lastName"
                            value={lastName}
                            variant="bordered"

                            onChange={(e) => setLastName(e.target.value)}
                            className="sm:col-span-2 block w-full"
                        />
                </div>
            </dl>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            
            <Button onClick={handleSave} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Guardar Cambios
            </Button>
            
        </div>
    </div>

    );
};

export default EditProfilePage;

