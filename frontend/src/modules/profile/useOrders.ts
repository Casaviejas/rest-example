import { useState, useEffect } from "react";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../services/order";

export interface Order {
  _id: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockOrders: Order[] = [
      { _id: "1", description: "Pedido de ejemplo 1", status: "pending", createdAt: "2026-03-17T10:00:00Z" },
      { _id: "2", description: "Pedido de ejemplo 2", status: "completed", createdAt: "2026-03-16T15:30:00Z" },
      { _id: "3", description: "Pedido de ejemplo 3", status: "pending", createdAt: "2026-03-15T12:45:00Z" },
    ];

    // simulacion de delay
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

//   const addOrder = async (description: string) => {
//     const order = await createOrder(description);
//     setOrders((prev) => [...prev, order]);
//     console.log("✅ [ADD_ORDER] Pedido agregado:", order);
//   };

  const addOrder = async (description: string) => {
    const newOrder: Order = {
      _id: (Math.random() * 1000000).toFixed(0),
      description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
    console.log("✅ [ADD_ORDER] Pedido agregado:", newOrder);
  };

  const editOrder = async (
    id: string,
    data: { description?: string; status?: string },
  ) => {
    const updated = await updateOrder(id, data);
    setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    console.log(`✅ [EDIT_ORDER] Pedido ${id} actualizado con:`, data);
  };

  const removeOrder = async (id: string) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o._id !== id));
    console.log(`✅ [DELETE_ORDER] Pedido ${id} eliminado`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    status: { orders, loading },
    actions: {
      setOrders,
      setLoading,
      fetchOrders,
      addOrder,
      editOrder,
      removeOrder,
    },
  };
}
