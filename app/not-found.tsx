import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">404 - Página no encontrada</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-5 text-center">Lo sentimos, la página que estás buscando no existe.</p>
            <Link href={{
                    pathname: '/dashboard',
                    
                  }} className="bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:ring-blue-300 font-medium text-sm px-5  text-center mr-2 mb-2">
                
                    Volver a la página principal
                
            </Link>
        </div>
    );
}
