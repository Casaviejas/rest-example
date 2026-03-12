import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/api";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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

    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setIsLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registro exitoso");
      navigate("/profile-page");
    } catch (error) {
      console.error("Error al registrarse:", error);
      toast.error(error instanceof Error ? error.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-5 text-xl font-semibold">Registro</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label className="flex flex-col gap-1">
          Nombre
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="border rounded px-2 py-1 disabled:opacity-50"
            placeholder="Tu nombre completo"
          />
        </label>

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

        <label className="flex flex-col gap-1">
          Confirmar Contraseña
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
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
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </>
  );
};
