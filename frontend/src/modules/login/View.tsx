import { WiiAvatar } from "../../components/WiiAvatar";
import { WiiCard } from "../../components/WiiCard";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";

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
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        Bienvenido de vuelta
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
        Inicia sesión en tu cuenta
      </motion.p>

      {/** Formulario de login */}
      <Form />

      {/** Link para ir a la página de registro */}
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
  );
};
