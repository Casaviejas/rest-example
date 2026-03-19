import { useState } from "react";
import { WiiCard } from "../../components/WiiCard";
import { WiiButton } from "../../components/WiiButton";
import { Edit3, Trash2 } from "lucide-react";
import type { Order, ProfileActions, ProfileState } from "../../types/schemas";

export function ProfileOrders({
  state,
  actions,
}: {
  state: ProfileState;
  actions: ProfileActions;
}) {
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState(1);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingQty, setEditingQty] = useState(1);

  if (state.isLoading) return <p className="text-white">Cargando pedidos...</p>;

  return (
    <WiiCard className="w-full mt-6 p-4">
      <h2 className="text-white font-bold mb-4">Tus pedidos</h2>

      {/* Lista de pedidos */}
      <div className="space-y-2">
        {state.orders.map((o: Order) => (
          <div
            key={o._id}
            className="flex justify-between items-center text-white bg-[#1F1F2A] p-2 rounded"
          >
            {editingId === o._id ? (
              <div className="flex gap-2 flex-1">
                <input
                  className="flex-1 p-1 rounded text-white"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <input
                  type="number"
                  className="w-20 p-1 rounded text-white"
                  value={editingQty}
                  onChange={(e) => setEditingQty(Number(e.target.value))}
                />
              </div>
            ) : (
              <span>
                {o.order_name} — Cantidad: {o.quantity}
              </span>
            )}

            {/* Botones */}
            <div className="flex gap-2">
              {editingId === o._id ? (
                <>
                  <WiiButton
                    onClick={async () => {
                      await actions.editOrder(o._id, {
                        product: editingName,
                        price: editingQty,
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
                      setEditingName(o.order_name);
                      setEditingQty(o.quantity);
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

      {/* Crear pedido */}
      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 p-2 rounded text-black"
          placeholder="Nombre del pedido"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <input
          type="number"
          className="w-24 p-2 rounded text-black"
          value={newQty}
          onChange={(e) => setNewQty(Number(e.target.value))}
        />

        <WiiButton
          onClick={async () => {
            if (!newName.trim()) return;

            await actions.addOrder(newName, newQty);

            setNewName("");
            setNewQty(1);
          }}
        >
          Crear
        </WiiButton>
      </div>
    </WiiCard>
  );
}
