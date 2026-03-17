import { Edit3, LogOut, Trash2 } from "lucide-react";
import { WiiButton } from "../../components/WiiButton";
import { motion } from "motion/react";

export function ProfileActions({
  isEditing,
  actions,
}: {
  isEditing: boolean;
  actions: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-4"
    >
      {!isEditing && (
        <WiiButton
          type="button"
          onClick={() => actions.setIsEditing(true)}
          className="w-full flex flex-row items-center justify-center gap-2"
        >
          <Edit3 size={20} />
          Editar perfil
        </WiiButton>
      )}

      <div className="flex gap-4">
        <WiiButton
          type="button"
          variant="secondary"
          onClick={actions.handleLogout}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Cerrar sesión
        </WiiButton>

        <WiiButton
          type="button"
          variant="danger"
          onClick={actions.handleDelete}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Trash2 size={20} />
          Eliminar cuenta
        </WiiButton>
      </div>
    </motion.div>
  );
}
