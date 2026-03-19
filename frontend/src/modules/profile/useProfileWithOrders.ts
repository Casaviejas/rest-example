import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  logout,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../services/user";
import { createOrder, updateOrder, deleteOrder } from "../../services/order";
import type { EditOrderData, Order, UserData } from "../../types/schemas";

export function useProfileWithOrders() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        const data = await getProfile();
        const { user, orders, warnings } = data;

        console.log(user.name);
        console.log(orders.orders);

        setUser(user);
        setOrders(orders.orders);

        setName(user.name || "");
        setEmail(user.email || "");
      } catch (error) {
        toast.error("Error al cargar el perfil");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSaving(true);

      await updateProfile({
        userData: {
          name,
          email,
          password: password || undefined,
        },
      });

      setUser((prev) => (prev ? { ...prev, name, email } : prev));

      setPassword("");
      setIsEditing(false);

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al actualizar el perfil",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const addOrder = async (product: string, price: number) => {
    try {
      const newOrder = await createOrder({ product, price });

      console.log(
        "✅ [ADD_ORDER] Pedido creado:",
        newOrder,
        "Añadiendo a estado local...",
      );
      if (newOrder.order._id) {
        setOrders((prev) => [newOrder.order, ...prev]);
        console.log("✅ [ADD_ORDER] Pedido agregado al estado:", newOrder);
      } else {
        console.error("❌ [ADD_ORDER] Respuesta no contiene ID:", newOrder);
      }
    } catch {
      toast.error("Error al crear pedido");
    }
  };

  const editOrder = async (id: number, data: EditOrderData) => {
    try {
      const updated = await updateOrder(id, data);

      setOrders((prev) => prev.map((o) => (o._id === id ? updated.order : o)));
    } catch {
      toast.error("Error al actualizar pedido");
    }
  };

  const removeOrder = async (id: number) => {
    try {
      await deleteOrder(id);

      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      toast.error("Error al eliminar pedido");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar cuenta?")) return;

    try {
      await deleteProfile();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al eliminar la cuenta",
      );
    }
  };

  return {
    state: {
      user,
      name,
      email,
      password,
      orders,
      isEditing,
      isLoading,
      isSaving,
    },
    actions: {
      setName,
      setEmail,
      setPassword,
      setIsEditing,
      handleUpdate,
      handleLogout,
      handleDelete,
      addOrder,
      editOrder,
      removeOrder,
    },
  };
}
