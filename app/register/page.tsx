"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (!backendUrl) {
      toast.error("La URL del backend no está configurada.");
      setIsLoading(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const res = await fetch(`${backendUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          last_name,
          email: normalizedEmail,
          password,
        }),
      });

      const responseAPI = await res.json();

      if (!res.ok) {
        const messages = Array.isArray(responseAPI.message)
          ? responseAPI.message
          : [responseAPI.message ?? "Error al registrar usuario"];
        toast.error(messages.join(", "), { duration: 4000 });
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        toast.error(responseNextAuth.error.split(",").join(", "), {
          duration: 4000,
        });
        return;
      }

      toast.success("Cuenta creada correctamente");
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="sm:w-[25rem] p-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src="Images/Logo.svg"
            alt="UJED Logo"
            className="sm:w-[15rem] w-[10rem]"
          />
        </div>
        <h2 className="text-base italic font-medium mb-4 text-center">
          Herramienta de Gestión de Reportes
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Apellido"
            name="last_name"
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="email@ujed.mx"
            name="email"
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Cargando...
              </>
            ) : (
              "Registrar"
            )}
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
