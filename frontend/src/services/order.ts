import { getToken, getAuthHeaders } from "./auth";
import { API_URL } from "./config";

export async function getOrders() {
  const token = getToken();
  if (!token) {
    console.error("❌ [GET_ORDERS] No hay token");
    throw new Error("No token found");
  }

  const url = `${API_URL}/orders`;
  console.log(`📡 [GET_ORDERS] GET a: ${url}`);
  
  const res = await fetch(url, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Error al obtener los pedidos");
  const data = await res.json();
  console.log("✅ [GET_ORDERS] Datos recibidos:", data);
  return data;
}

export async function createOrder(description: string) {
  const token = getToken();
  if (!token) {
    console.error("❌ [CREATE_ORDER] No hay token");
    throw new Error("No token found");
  }

  const url = `${API_URL}/orders`;
  console.log(`📡 [CREATE_ORDER] POST a: ${url} con body:`, { description });

  const res = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ description }),
  });
  if (!res.ok) throw new Error("Error al crear el pedido");
  const data = await res.json();
  console.log("✅ [CREATE_ORDER] Pedido creado:", data);
  return data;
}

export async function updateOrder(id: string, data: { description?: string; status?: string }) {
  const token = getToken();
  if (!token) {
    console.error("❌ [UPDATE_ORDER] No hay token");
    throw new Error("No token found");
  }

  const url = `${API_URL}/orders/${id}`;
  console.log(`📡 [UPDATE_ORDER] PUT a: ${url} con body:`, data);

  const res = await fetch(url, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el pedido");
  const updated = await res.json();
  console.log("✅ [UPDATE_ORDER] Pedido actualizado:", updated);
  return updated;
}

export async function deleteOrder(id: string) {
  const token = getToken();
  if (!token) {
    console.error("❌ [DELETE_ORDER] No hay token");
    throw new Error("No token found");
  }

  const url = `${API_URL}/orders/${id}`;
  console.log(`📡 [DELETE_ORDER] DELETE a: ${url}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar el pedido");
  console.log(`✅ [DELETE_ORDER] Pedido ${id} eliminado`);
}
