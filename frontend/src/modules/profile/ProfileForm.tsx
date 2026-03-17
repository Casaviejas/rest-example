import { User, Mail, Lock, Save } from "lucide-react";
import { WiiInput } from "../../components/WiiInput";
import { WiiButton } from "../../components/WiiButton";
import { motion } from "motion/react";

export const ProfileForm = ({
  state,
  actions,
}: {
  state: any;
  actions: any;
}) => {
  const { name, email, password, isEditing, isSaving } = state;
  const { setName, setEmail, setPassword, handleUpdate, setIsEditing } =
    actions;

  return (
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
          placeholder={
            isEditing ? "Dejar en blanco para no cambiar" : "••••••••"
          }
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
  );
};
