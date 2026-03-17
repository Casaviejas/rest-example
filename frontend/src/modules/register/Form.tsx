import toast from "react-hot-toast";
import { register } from "../../services/user";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "motion/react";
import { WiiButton } from "../../components/WiiButton";
import { WiiInput } from "../../components/WiiInput";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "#FF6B35";
    if (passwordStrength <= 50) return "#FFB800";
    if (passwordStrength <= 75) return "#00D9FF";
    return "#00FF87";
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Débil";
    if (passwordStrength <= 50) return "Media";
    if (passwordStrength <= 75) return "Buena";
    return "Excelente";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📝 [RegisterPage] Enviando formulario de registro...");

    if (!name || !email || !password || !confirmPassword) {
      console.warn("⚠️ [RegisterPage] Campos vacíos");
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      console.warn("⚠️ [RegisterPage] Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      console.warn("⚠️ [RegisterPage] Contraseña muy corta");
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setIsLoading(true);
      console.log("📝 [RegisterPage] Iniciando request de registro...");
      await register({ name, email, password });
      console.log("✅ [RegisterPage] Registro exitoso!");
      toast.success("Registro exitoso");
      navigate("/profile");
    } catch (error) {
      console.error("❌ [RegisterPage] Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al registrarse",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordMatch =
    password === confirmPassword && confirmPassword !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <WiiInput
          type="text"
          label="Nombre"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          showValidation
          isValid={name.length >= 2}
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <WiiInput
          type="email"
          label="Email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          showValidation
          isValid={isEmailValid}
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <WiiInput
          type="password"
          label="Contraseña"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mt-2"
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-xs text-[#B0B8C1]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Fortaleza
              </span>
              <span
                className="text-xs font-semibold"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: getStrengthColor(),
                }}
              >
                {getStrengthLabel()}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: getStrengthColor() }}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <WiiInput
          type="password"
          label="Confirmar Contraseña"
          icon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showValidation
          isValid={isPasswordMatch}
          error={
            confirmPassword && !isPasswordMatch
              ? "Las contraseñas no coinciden"
              : undefined
          }
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <WiiButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </WiiButton>
      </motion.div>
    </form>
  );
};
