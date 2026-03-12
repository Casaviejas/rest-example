import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../../services/api";
import { WiiCard } from "../components/WiiCard";
import { WiiInput } from "../components/WiiInput";
import { WiiButton } from "../components/WiiButton";
import { WiiAvatar } from "../components/WiiAvatar";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

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
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <WiiCard className="w-full max-w-md p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <WiiAvatar size="lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-center mb-2"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 700 }}
        >
          Bienvenido de vuelta
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#B0B8C1] text-center mb-8"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "20px", fontWeight: 600 }}
        >
          Inicia sesión en tu cuenta
        </motion.p>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <Link
            to="/register"
            className="text-[#00D9FF] hover:text-[#1F88E8] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ¿No tienes cuenta? <span className="font-semibold">Regístrate</span>
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
