import { Schema, model, Document } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
}

export type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: [8, 'La contraseña debe tener al menos 8 caracteres'] },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);