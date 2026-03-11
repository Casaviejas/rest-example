import { Response } from "express";
import { UserModel } from "../models/user-model";
import { AuthRequest } from "../middlewares/auth.middleware";


export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await UserModel.findById(userId).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo perfil",
    });
  }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Perfil actualizado",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error actualizando perfil",
    });
  }
};


export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    await UserModel.findByIdAndDelete(userId);

    res.json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminando usuario",
    });
  }
};