"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/app/api/user/route';
import { Button, Card, Skeleton } from '@nextui-org/react';
import { toast } from 'sonner';
import { useDeleteUser } from '@/app/api/user/route';

const ProfilePage = () => {
    const { userData, loading } = useUserData();
    const router = useRouter();

    const deleteUser = useDeleteUser();

    const handleDelete = async () => {
        try {
            await deleteUser();
            console.log("User deleted successfully");
        } catch (error:any) {
            toast.error('Failed to delete profile. ' + error.message);
        }
    };


    if (loading) return         <Card className=" shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto my-10 p-6" radius="lg">
            <div className="px-4 py-5 sm:px-6">
                <h1 className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                        <Skeleton className="h-3 mt-1 w-[3rem] rounded-lg"/>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <Skeleton className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Roles</dt>
                        <Skeleton className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Fecha creación</dt>
                        <Skeleton className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Ultima actialización</dt>
                        <Skeleton className="h-3 mt-1 w-w-full rounded-lg"/>
                    </div>
                </dl>
            </div>

            <div className="px-4 py-3 items-center sm:px-6 flex sm:flex-row-reverse justify-between">

                <div className='sm:px-6 sm:flex sm:flex-row-reverse'>
                <Button isDisabled className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                </Button>
                <Button isDisabled className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Eliminar
                </Button>
                </div>

                <div className="  animate-spin rounded-full border-t-2 border-r-2 border-blue-500 border-solid h-8 w-8"></div>

                
            </div>
        </Card>;
    if (!userData) return <div className="flex justify-center items-center min-h-screen">Información del usuario no disponible</div>;

    const handleEdit = () => {
        // Redirige al usuario a la página de edición
        router.push(`/dashboard/editprofile`);
    };


    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto my-10 p-6">
            <div className="px-4 py-5 sm:px-6">
                <h1 className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.name} {userData.last_name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Roles</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.roles.join(', ')}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Fecha creación</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.created_at}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Ultima actualización</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.updated_at}</dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-between">

                <div className='sm:px-6 flex flex-row-reverse'>
                    <Button onClick={handleEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                </Button>
                <Button onClick={()=> toast.error('', {
                    cancel:<Button
                    onClick={() => toast.dismiss()}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                    >
                    Cancelar
                    </Button>,
                    action:    
                        <Button
                        onClick={handleDelete}
                        className="w-full bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                        Confirmar
                        </Button>,
                        
                    })} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Eliminar
                </Button>
                </div>


                
            </div>
        </div>
    );
};

export default ProfilePage;
