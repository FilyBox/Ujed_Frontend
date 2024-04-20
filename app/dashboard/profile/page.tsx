"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/hooks/user/route';
import { Button} from '@nextui-org/react';
import { toast } from 'sonner';
import { useDeleteUser } from '@/hooks/user/route';
import ProfileSkeleton from './components/profileskeleton';

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


    if (loading) return   <ProfileSkeleton />

    
    if (!userData) return  <ProfileSkeleton />

    const handleEdit = () => {
        // Redirige al usuario a la página de edición
        router.push(`/dashboard/editprofile`);
    };


    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-full mx-auto sm:my-10 p-6 overflow-y-auto">
            <div className="px-4 py-5 sm:px-6">
                <h1 aria-label='title' className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
                <p aria-label='subtitle' className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt aria-label='user name label' className="text-sm font-medium text-gray-500">Nombre completo</dt>
                        <dd aria-label='user name' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">{userData.name} {userData.last_name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt aria-label='email label' className="text-sm font-medium text-gray-500">Email</dt>
                        <dd aria-label='email' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt aria-label='roles label' className="text-sm font-medium text-gray-500">Roles</dt>
                        <dd aria-label='roles' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.roles.join(', ')}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt aria-label='creation date label' className="text-sm font-medium text-gray-500">Fecha creación</dt>
                        <dd aria-label='creation date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.created_at}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt aria-label='updated date label' className="text-sm font-medium text-gray-500">Ultima actualización</dt>
                        <dd aria-label='updated date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.updated_at}</dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-between">

                <div className='sm:px-6 flex flex-row-reverse'>
                    <Button aria-label='button edit' onClick={handleEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                </Button>
                <Button aria-label='button delete' onClick={()=> toast.error('', {
                    cancel:<Button aria-label='button cancel'
                    onClick={() => toast.dismiss()}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                    >
                    Cancelar
                    </Button>,
                    action:    
                        <Button aria-label='button confirm'
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
