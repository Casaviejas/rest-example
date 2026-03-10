import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user-model";
import { RegisterBody, LoginBody } from "../middlewares/validate.middleware";

export interface RegisterResult {
  id: string;
  name: string;
  email: string;
}

export interface LoginResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async (
  data: RegisterBody,
): Promise<RegisterResult> => {
  const { name, email, password } = data;

  // 1. Verificar si el email ya está registrado
  const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error("El email ya está registrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 409;
    throw error;
  }

  // 2. Hashear la contraseña (salt rounds = 10)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Crear el usuario en la base de datos
  const newUser = await UserModel.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  // 4. Retornar solo los datos públicos (sin password)
  return {
    id: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async (data: LoginBody): Promise<LoginResult> => {
  const { email, password } = data;

  //verificar que el usuario existe
  const user = await UserModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    const error = new Error("Credenciales incorrectas") as Error & {
      statusCode: number;
    };
    error.statusCode = 401;
    throw error;
  }

  //comparar contraseña con hash almacenado
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Credenciales incorrectas") as Error & {
      statusCode: number;
    };
    error.statusCode = 401;
    throw error;
  }

  //generar el token JWT
  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email },
    jwtSecret as string,
    { expiresIn: "2h" },
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
};
