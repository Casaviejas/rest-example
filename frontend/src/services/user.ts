import type { ProfileResponse, UpdateProfileParams } from "../types/schemas";
import { getToken, getAuthHeaders } from "./auth";
import { API_URL_AGGREGATOR, API_URL_USER } from "./config";

export async function register(credentials: {
  name: string;
  email: string;
  password: string;
}) {
  console.log("📝 [REGISTER] Iniciando registro con:", {
    name: credentials.name,
    email: credentials.email,
  });
  console.log(`📝 [REGISTER] Enviando POST a: ${API_URL_USER}/auth/register`);

  try {
    const response = await fetch(`${API_URL_USER}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log(
      `📝 [REGISTER] Respuesta recibida - Status: ${response.status} ${response.statusText}`,
    );

    const data = await response.json();
    console.log("📝 [REGISTER] Datos recibidos:", data);

    if (!response.ok) {
      console.error("❌ [REGISTER] Error en respuesta:", data.message);
      throw new Error(data.message || "Error en el registro");
    }

    if (data.token) {
      console.log("✅ [REGISTER] Token recibido, guardando en localStorage");
      localStorage.setItem("token", data.token);
    }

    console.log("✅ [REGISTER] Registro exitoso!");
    return data;
  } catch (error) {
    console.error("❌ [REGISTER] Error:", error);
    throw error;
  }
}

export async function login(credentials: { email: string; password: string }) {
  console.log("🔐 [LOGIN] Iniciando login con:", { email: credentials.email });
  console.log(`🔐 [LOGIN] Enviando POST a: ${API_URL_USER}/auth/login`);

  try {
    const response = await fetch(`${API_URL_USER}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log(
      `🔐 [LOGIN] Respuesta recibida - Status: ${response.status} ${response.statusText}`,
    );

    const data = await response.json();
    console.log("🔐 [LOGIN] Datos recibidos:", data);

    if (!response.ok) {
      console.error("❌ [LOGIN] Error en respuesta:", data.message);
      throw new Error(data.message || "Error en el login");
    }

    if (data.token) {
      console.log("✅ [LOGIN] Token recibido, guardando en localStorage");
      localStorage.setItem("token", data.token);
    }

    console.log("✅ [LOGIN] Login exitoso!");
    return data;
  } catch (error) {
    console.error("❌ [LOGIN] Error:", error);
    throw error;
  }
}


export async function logout() {
  console.log("🚪 [LOGOUT] Cerrando sesión...");
  localStorage.removeItem("token");
  console.log("✅ [LOGOUT] Sesión cerrada");
}

export async function getProfile() {
  let token = getToken();
  if (!token) {
    console.error("❌ [GET_PROFILE] No hay token");
    throw new Error("No token found");
  }

  console.log("👤 [GET_PROFILE] Obteniendo perfil");
  console.log(`👤 [GET_PROFILE] Enviando GET a: ${API_URL_AGGREGATOR}/profile/me`);

  try {
    let response = await fetch(`${API_URL_AGGREGATOR}/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log(
      `👤 [GET_PROFILE] Respuesta recibida - Status: ${response.status}`,
    );

    let data: ProfileResponse = await response.json();
    console.log("👤 [GET_PROFILE] User:", data.user);
    console.log("👤 [GET_PROFILE] Orders:", data.orders);

    return data;
  } catch (error) {
    console.error("❌ [GET_PROFILE] Error:", error);
    throw error;
  }
}

export async function updateProfile(params: UpdateProfileParams) {
  let token = getToken();

  if (!token) {
    console.error("❌ [UPDATE_PROFILE] No hay token");
    throw new Error("No token found");
  }

  console.log("📝 [UPDATE_PROFILE] Actualizando perfil con:", params.userData);
  console.log(`📝 [UPDATE_PROFILE] Enviando PUT a: ${API_URL_USER}/profile/me`);

  try {
    let response = await fetch(`${API_URL_USER}/profile/me`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(params.userData),
    });

    console.log(
      `📝 [UPDATE_PROFILE] Respuesta recibida - Status: ${response.status}`,
    );

    let data = await response.json();
    console.log("📝 [UPDATE_PROFILE] Datos de respuesta:", data);

    console.log("✅ [UPDATE_PROFILE] Perfil actualizado exitosamente!");
    return data;
  } catch (error) {
    console.error("❌ [UPDATE_PROFILE] Error:", error);
    throw error;
  }
}

export async function deleteProfile() {
  let token = getToken();
  if (!token) {
    console.error("❌ [DELETE_PROFILE] No hay token");
    throw new Error("No token found");
  }

  console.log("🗑️ [DELETE_PROFILE] Eliminando perfil");
  console.log(`🗑️ [DELETE_PROFILE] Enviando DELETE a: ${API_URL_USER}/profile/me`);

  try {
    let id = await getProfile().then((profile) => profile.user.id);
    console.log(`🗑️ [DELETE_PROFILE] ID del usuario a eliminar: ${id}`);

    let response = await fetch(`${API_URL_USER}/profile/me`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ id: id }),
    });

    console.log(
      `🗑️ [DELETE_PROFILE] Respuesta recibida - Status: ${response.status}`,
    );
    console.log("✅ [DELETE_PROFILE] Perfil eliminado exitosamente!");

    return response.ok;
  } catch (error) {
    console.error("❌ [DELETE_PROFILE] Error:", error);
    throw error;
  }
}
