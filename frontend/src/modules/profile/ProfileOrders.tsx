import { useState } from "react";
import { WiiCard } from "../../components/WiiCard";
import { WiiButton } from "../../components/WiiButton";
import { useOrders } from "./useOrders";
import { Edit3, Trash2 } from "lucide-react";

export interface Order {
  _id: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
}

export function ProfileOrders() {
  const { status, actions } = useOrders();
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDesc, setEditingDesc] = useState("");

  if (status.loading) return <p className="text-white">Cargando pedidos...</p>;

  return (
    <WiiCard className="w-full mt-6 p-4">
      <h2 className="text-white font-bold mb-4">Tus pedidos</h2>

      {/* Lista de pedidos */}
      <div className="space-y-2">
        {status.orders.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center text-white bg-[#1F1F2A] p-2 rounded"
          >
            {editingId === o._id ? (
              <input
                className="flex-1 p-1 rounded text-white"
                value={editingDesc}
                onChange={(e) => setEditingDesc(e.target.value)}
              />
            ) : (
              <span>{o.description}</span>
            )}

            {/* Botones de acción para cada pedido */}
            <div className="flex gap-2">
              {editingId === o._id ? (
                <>
                  <WiiButton
                    onClick={async () => {
                      await actions.editOrder(o._id, {
                        description: editingDesc,
                      });
                      setEditingId(null);
                    }}
                  >
                    Guardar
                  </WiiButton>
                  
                  <WiiButton
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancelar
                  </WiiButton>
                </>
              ) : (
                <>
                  <WiiButton
                    onClick={() => {
                      setEditingId(o._id);
                      setEditingDesc(o.description);
                    }}
                  >
                    <Edit3 size={16} />
                  </WiiButton>
                  <WiiButton
                    variant="danger"
                    onClick={() => actions.removeOrder(o._id)}
                  >
                    <Trash2 size={16} />
                  </WiiButton>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Crear nuevo pedido */}
      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 p-2 rounded text-black"
          placeholder="Ingresar descripcion nuevo pedido ..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <WiiButton
          onClick={async () => {
            if (!newDesc.trim()) return;
            await actions.addOrder(newDesc);
            setNewDesc("");
          }}
        >
          Crear
        </WiiButton>
      </div>
    </WiiCard>
  );
}
