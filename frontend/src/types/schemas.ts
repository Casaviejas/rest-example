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