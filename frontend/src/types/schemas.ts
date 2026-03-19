import type { useProfileWithOrders } from "../modules/profile/useProfileWithOrders";

export interface UserData {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

export type FormData = UserData;

export interface UpdateProfileParams {
  userData: UserData;
}

export interface Order {
  _id: number;
  userId: number;
  order_name: string;
  quantity: number;
}

export interface ProfileResponse {
  user: UserData;
  orders: { orders: Order[] };
  warnings?: string[];
}

export interface EditOrderData {
  product?: string;
  price?: number;
}

export type UseProfileReturn = ReturnType<typeof useProfileWithOrders>;

export type ProfileState = UseProfileReturn["state"];
export type ProfileActions = UseProfileReturn["actions"];
