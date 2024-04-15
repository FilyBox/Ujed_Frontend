"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'sonner'

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [last_name, setlast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          last_name,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(Array.isArray(responseAPI.message) ? responseAPI.message : [responseAPI.message]);

      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen ">

      <div className=" sm:w-[25rem] p-8">

          <div className="flex items-center justify-center mb-6">
            <img src="Images/Logo.svg" alt="UJED Logo" className=" sm:w-[15rem] w-[10rem]" />
          </div>
          <h2 className="text-base sm:text-base italic font-medium mb-4 text-center">Herramienta de Gestión de Reportes</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
          type="text"
          placeholder="Nombre"
          name="name"
          className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
                  <input
          type="text"
          placeholder="Apellido"
          name="last_name"
          className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          value={last_name}
          onChange={(event) => setlast_name(event.target.value)}
        />

        <input
          type="email"
          placeholder="email@ujed.mx"
          name="email"
          className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="contraseña"
          name="password"
          className="form-control w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
          Registrar
        </button>


        <Link
              href="/login"
              className="flex justify-center items-center w-full text-[#B11830] py-2 rounded-md hover:text-red-600 transition-colors duration-300"
            >
              Acceder
        </Link>

          </form>



      </div>
    </div>
  );
};
export default RegisterPage;
