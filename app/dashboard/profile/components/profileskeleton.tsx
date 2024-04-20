import React from 'react';
import { Button, Card, CircularProgress, Skeleton } from '@nextui-org/react';

const ProfileSkeleton= () => {

    return (
        <Card aria-label='card' className=" shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto my-10 p-6" radius="lg">
            <div aria-label='titles container' className="px-4 py-5 sm:px-6">
                <h1 className="text-lg leading-6 font-medium text-gray-900">Usuario</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales del usuario</p>
            </div>
            <div aria-label='container' className="border-t border-gray-200">
                <dl aria-label='container'>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                        <Skeleton aria-label='skeleton' className="h-3 mt-1 w-[3rem] rounded-lg"/>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <Skeleton aria-label='skeleton' className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <p className="text-sm font-medium text-gray-500">Roles</p>
                        <Skeleton aria-label='skeleton' className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <p className="text-sm font-medium text-gray-500">Fecha creación</p>
                        <Skeleton aria-label='skeleton' className="h-3 mt-1 w-full rounded-lg"/>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <p className="text-sm font-medium text-gray-500">Ultima actialización</p>
                        <Skeleton aria-label='skeleton' className="h-3 mt-1 w-w-full rounded-lg"/>
                    </div>
                </dl>
            </div>

            <div className="px-4 py-3 items-center sm:px-6 flex sm:flex-row-reverse justify-between">

                <div className='sm:px-6 sm:flex sm:flex-row-reverse'>
                <Button aria-label='edit' isDisabled className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                </Button>
                <Button aria-label='delete' isDisabled className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Eliminar
                </Button>
                </div>

                <CircularProgress aria-label='loading'  classNames={{
            indicator: "stroke-[#cf112d]",
            value: "text-3xl font-semibold ",
          }}/>
                
            </div>
        </Card>
    );
};

export default ProfileSkeleton;
