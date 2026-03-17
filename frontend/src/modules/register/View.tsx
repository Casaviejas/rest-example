import { UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { WiiCard } from "../../components/WiiCard";
import { useEffect } from "react";
import { Form } from "./Form";

export const View = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <WiiCard className="w-full max-w-md p-8">
      {/** Avatar y texto de bienvenida */}
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
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        Únete a nosotros
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[#B0B8C1] text-center mb-8"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Crea tu cuenta en segundos
      </motion.p>

      {/** Formulario de registro */}
      <Form />

      {/** Link para ir a la página de login */}
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
          ¿Ya tienes cuenta?{" "}
          <span className="font-semibold">Inicia sesión</span>
        </Link>
      </motion.div>
    </WiiCard>
  );
};
