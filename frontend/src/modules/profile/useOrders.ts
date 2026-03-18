import { useState, useEffect } from "react";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../services/order";

export interface Order {
  _id: string;
  userID?: string;      
  order_name: string;
  quantity: number;
  createdAt: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const mockOrders: Order[] = [
    { _id: "1", order_name: "Pedido de ejemplo 1", quantity: 2, createdAt: "2026-03-17T10:00:00Z" },
    { _id: "2", order_name: "Pedido de ejemplo 2", quantity: 5, createdAt: "2026-03-16T15:30:00Z" },
    { _id: "3", order_name: "Pedido de ejemplo 3", quantity: 1, createdAt: "2026-03-15T12:45:00Z" },
  ];

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

const addOrder = async (order_name: string, quantity: number) => {
  const newOrder: Order = {
    _id: (Math.random() * 1000000).toFixed(0),
    order_name,
    quantity,
    createdAt: new Date().toISOString(),
  };
  setOrders((prev) => [...prev, newOrder]);
  console.log("✅ [ADD_ORDER] Pedido agregado:", newOrder);
};

  const editOrder = async (
    id: string,
    data: { order_name?: string; quantity?: number },
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
