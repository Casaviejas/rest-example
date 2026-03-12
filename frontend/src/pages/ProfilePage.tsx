import { useEffect, useState } from "react";
import { deleteProfile, updateProfile } from "../services/api";
import type { UserData, FormData } from "../types/schemas";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        // const data = await getProfile();
        const data = {
          id: "0",
          name: "John Doe",
          email: "algo@correo",
          password: "",
        };

        setProfile(data);
        setFormData({
          name: data.name ?? "",
          email: data.email ?? "",
          password: "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error al cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await updateProfile({ userData: formData });

      setProfile(updated);
      toast.success("Perfil actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
    );

    if (!confirmed) return;

    try {
      const ok = await deleteProfile();

      if (ok) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error eliminando cuenta:", error);
      toast.error("Error al eliminar la cuenta");
    }
  };

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <>
      <h1 className="mb-5 text-xl font-semibold">Profile Page</h1>

      {profile && (
        <section>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              Nombre
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col gap-1">
              Correo
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="border rounded px-2 py-1"
              />
            </label>

            {isEditing && (
              <label className="flex flex-col gap-1">
                Contraseña
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="border rounded px-2 py-1"
                />
              </label>
            )}

            {isEditing && (
              <div className="flex gap-3">
                <button type="submit" className="px-3 py-1 border rounded">
                  Guardar cambios
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: profile.name,
                      email: profile.email,
                      password: "",
                    });
                  }}
                  className="px-3 py-1 border rounded"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 border rounded"
              >
                Actualizar perfil
              </button>

              <button
                onClick={handleDeleteAccount}
                className="px-3 py-1 border rounded"
              >
                Eliminar cuenta
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};
