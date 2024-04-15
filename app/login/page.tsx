"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from 'sonner'

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
      // Use useEffect to display toast after errors state is updated

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(
        <div className="alert alert-danger">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>,
        { duration: 3000 }
      );
    }
  }, [errors]); // Re-render toast when errors state changes
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });


    if (responseNextAuth?.error) {
  
      setErrors(responseNextAuth.error.split(","));
      return;
    }


    router.push("/dashboard/newreport");
  };

  return (
      <div className="flex items-center justify-center h-screen ">
        <div className=" sm:w-[25rem] p-8">

          <div className="flex items-center justify-center mb-6">
            <img src="Images/Logo.svg" alt="UJED Logo" className=" sm:w-[15rem] w-[10rem]" />
          </div>
          <h2 className="text-base sm:text-base italic font-medium mb-4 text-center">Herramienta de Gestión de Reportes</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="email@ujed.mx" name="email"
              className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email} onChange={(event)=> setEmail(event.target.value)}
            />
            <input type="contraseña" placeholder="contraseña" name="password"
              className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password} onChange={(event)=> setPassword(event.target.value)}
            />
            <button type="submit"
              className="w-full bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
              Acceder
            </button>

            <Link
              href="/register"
              className="flex justify-center items-center w-full text-[#B11830] py-2 rounded-md hover:text-red-600 transition-colors duration-300"
            >
              Registrarse
            </Link>
          </form>
        


        </div>
      </div>
      

  );
};
export default LoginPage;
