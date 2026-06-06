"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
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

      if (responseNextAuth?.ok) {
        toast.success("Sesión iniciada correctamente");
        router.push("/dashboard");
      }
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
              "Acceder"
            )}
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
