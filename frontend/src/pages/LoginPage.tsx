import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/api";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile-page");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);
      await login(formData);
      toast.success("Inicio de sesión exitoso");
      navigate("/profile-page");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-5 text-xl font-semibold">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label className="flex flex-col gap-1">
          Correo
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="border rounded px-2 py-1 disabled:opacity-50"
            placeholder="tu@email.com"
          />
        </label>

        <label className="flex flex-col gap-1">
          Contraseña
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="border rounded px-2 py-1 disabled:opacity-50"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </>
  );
};
