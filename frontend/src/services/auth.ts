export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getAuthHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
