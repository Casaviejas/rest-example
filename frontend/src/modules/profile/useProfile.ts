import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  logout,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../services/api";

export function useProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(
      "👤 [ProfilePage] Token encontrado:",
      token ? "✅ Sí" : "❌ No",
    );

    if (!token) {
      console.log("👤 [ProfilePage] Redirigiendo a login porque no hay token");
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        console.log("👤 [ProfilePage] Obteniendo perfil del usuario...");
        const data = await getProfile();
        console.log("✅ [ProfilePage] Perfil obtenido:", data);
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error("❌ [ProfilePage] Error al cargar perfil:", error);
        toast.error("Error al cargar el perfil");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("✏️ [ProfilePage] Actualizando perfil...");

    if (!name || !email) {
      console.warn("⚠️ [ProfilePage] Campos vacíos");
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSaving(true);
      console.log("✏️ [ProfilePage] Enviando datos al servidor...");
      await updateProfile({
        userData: {
          name,
          email,
          password: password || undefined,
        },
      });
      console.log("✅ [ProfilePage] Perfil actualizado correctamente!");
      setPassword("");
      setIsEditing(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("❌ [ProfilePage] Error al actualizar perfil:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al actualizar el perfil",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    console.log("🚪 [ProfilePage] Cerrando sesión...");
    try {
      await logout();
      console.log("✅ [ProfilePage] Sesión cerrada");
      navigate("/");
    } catch (error) {
      console.error("❌ [ProfilePage] Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      )
    ) {
      console.log("⚠️ [ProfilePage] Eliminación cancelada por el usuario");
      return;
    }

    console.log("🗑️ [ProfilePage] Eliminando cuenta...");
    try {
      await deleteProfile();
      console.log("✅ [ProfilePage] Cuenta eliminada");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("❌ [ProfilePage] Error al eliminar cuenta:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al eliminar la cuenta",
      );
    }
  };

  return {
    state: {
      isEditing,
      name,
      email,
      password,
      isLoading,
      isSaving,
    },
    actions: {
      setIsEditing,
      setName,
      setEmail,
      setPassword,
      handleUpdate,
      handleLogout,
      handleDelete,
    },
  };
}
