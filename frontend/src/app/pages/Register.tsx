import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { register } from "../../services/api";
import { WiiCard } from "../components/WiiCard";
import { WiiInput } from "../components/WiiInput";
import { WiiButton } from "../components/WiiButton";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

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
      toast.error(error instanceof Error ? error.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordMatch = password === confirmPassword && confirmPassword !== "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <WiiCard className="w-full max-w-md p-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1F88E8] to-[#00D9FF] flex items-center justify-center shadow-[0_8px_32px_rgba(0,217,255,0.3)] border-2 border-[#00D9FF]">
            <UserPlus size={64} className="text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-center mb-2"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 700 }}
        >
          Únete a nosotros
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#B0B8C1] text-center mb-8"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "20px", fontWeight: 600 }}
        >
          Crea tu cuenta en segundos
        </motion.p>

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
                  <span className="text-xs text-[#B0B8C1]" style={{ fontFamily: "Inter, sans-serif" }}>
                    Fortaleza
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", color: getStrengthColor() }}
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
              error={confirmPassword && !isPasswordMatch ? "Las contraseñas no coinciden" : undefined}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <Link
            to="/"
            className="text-[#00D9FF] hover:text-[#1F88E8] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ¿Ya tienes cuenta? <span className="font-semibold">Inicia sesión</span>
          </Link>
        </motion.div>
      </WiiCard>

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
