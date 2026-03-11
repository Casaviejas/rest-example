import { Request, Response, NextFunction } from "express";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

// Validaciones básicas sin librería externa
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, email, password } = req.body as RegisterBody;
  const errors: string[] = [];

  if (!name || name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("El email no es válido");
  }

  if (!password || password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { email, password } = req.body as LoginBody;
  const errors: string[] = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("El email no es valido");
  }

  if (!password || password.trim().length === 0) {
    errors.push("La contraseña es requerida");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos invalidos", errors });
    return;
  }

  next();
};
