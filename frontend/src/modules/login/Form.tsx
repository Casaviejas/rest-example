import { WiiButton } from "../../components/WiiButton";
import { WiiInput } from "../../components/WiiInput";

import { useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";

import { login } from "../../services/api";

export const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔐 [LoginPage] Enviando formulario...");

    if (!email || !password) {
      console.warn("⚠️ [LoginPage] Campos vacíos");
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);
      console.log("🔐 [LoginPage] Iniciando request de login...");
      await login({ email, password });
      console.log("✅ [LoginPage] Login exitoso!");
      toast.success("Inicio de sesión exitoso");
      navigate("/profile");
    } catch (error) {
      console.error("❌ [LoginPage] Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al iniciar sesión",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <WiiInput
          type="password"
          label="Contraseña"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <WiiButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </WiiButton>
      </motion.div>
    </form>
  );
};
