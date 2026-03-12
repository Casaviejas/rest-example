import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Mail, User, Lock, Edit3, Save, LogOut, Trash2, Wifi } from "lucide-react";
import toast from "react-hot-toast";
import { logout, getProfile, updateProfile, deleteProfile } from "../../services/api";
import { WiiCard } from "../components/WiiCard";
import { WiiInput } from "../components/WiiInput";
import { WiiButton } from "../components/WiiButton";
import { WiiAvatar } from "../components/WiiAvatar";

export function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOnline] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("👤 [ProfilePage] Token encontrado:", token ? "✅ Sí" : "❌ No");
    
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
          password: password || undefined 
        } 
      });
      console.log("✅ [ProfilePage] Perfil actualizado correctamente!");
      setPassword("");
      setIsEditing(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("❌ [ProfilePage] Error al actualizar perfil:", error);
      toast.error(error instanceof Error ? error.message : "Error al actualizar el perfil");
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
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
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
      toast.error(error instanceof Error ? error.message : "Error al eliminar la cuenta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Connection status indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#00D9FF]/30 rounded-full px-4 py-2"
      >
        <Wifi size={16} className={isOnline ? "text-[#00FF87]" : "text-[#FF6B35]"} />
        <span className="text-sm text-white" style={{ fontFamily: "Inter, sans-serif" }}>
          {isOnline ? "Conectado" : "Desconectado"}
        </span>
      </motion.div>

      {isLoading ? (
        <WiiCard className="w-full max-w-2xl p-8 text-center text-white">
          <p>Cargando perfil...</p>
        </WiiCard>
      ) : (
        <WiiCard className="w-full max-w-2xl p-8">
          {/* Avatar and header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
          <WiiAvatar size="lg" name={name} />
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white mt-4 mb-2"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 700 }}
          >
            {name || "Usuario"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#B0B8C1]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {email}
          </motion.p>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-full px-4 py-2"
              >
                <Edit3 size={16} className="text-[#FF6B35]" />
                <span className="text-sm text-white font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Modo edición
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Profile form */}
        <form onSubmit={handleUpdate} className="space-y-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WiiInput
              type="text"
              label="Nombre"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "opacity-60" : ""}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <WiiInput
              type="email"
              label="Email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "opacity-60" : ""}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <WiiInput
              type="password"
              label="Nueva Contraseña (opcional)"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "opacity-60" : ""}
              placeholder={isEditing ? "Dejar en blanco para no cambiar" : "••••••••"}
            />
          </motion.div>

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <WiiButton 
                type="submit" 
                className="flex-1 flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save size={20} />
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </WiiButton>
              <WiiButton
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="flex-1"
                disabled={isSaving}
              >
                Cancelar
              </WiiButton>
            </motion.div>
          )}
        </form>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          {!isEditing && (
            <WiiButton
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Edit3 size={20} />
              Editar perfil
            </WiiButton>
          )}

          <div className="flex gap-4">
            <WiiButton
              type="button"
              variant="secondary"
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Cerrar sesión
            </WiiButton>
            
            <WiiButton
              type="button"
              variant="danger"
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              Eliminar cuenta
            </WiiButton>
          </div>
        </motion.div>
      </WiiCard>

      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-0 right-0 text-center text-[#B0B8C1] text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        © 2026 Wii U Inspired App. Todos los derechos reservados.
      </motion.footer>

      {/* Decorative wave corner - top right */}
      <svg
        className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <path
          d="M200,0 Q150,50 200,100 L200,0 Z"
          fill="url(#cornerGradient)"
        />
        <defs>
          <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F88E8" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative wave corner - bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <path
          d="M0,200 Q50,150 0,100 L0,200 Z"
          fill="url(#cornerGradient2)"
        />
        <defs>
          <linearGradient id="cornerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#1F88E8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
