import { NavigateFunction } from "react-router-dom";

export type NotificationType = {
  _id?: string;
  title: string;
  description: string;
  name: string;
};

export interface IUser {
  message: string;
  token: string;
  username: string;
  email: string;
  password: string;
  _id?: string;
  image?: string;
  followers?: string[];
  following?: string[];
  bio: string;
  notifications?: NotificationType[];
  seenNotifications?: NotificationType[];
  createdAt?: Date;
}

export interface IAuthUser {
  email: string;
  password: string;
  username?: string;
}

export interface IAuth {
  formData: IAuthUser;
  navigate: NavigateFunction;
  toast?: any;
}

export interface IForgotPassword {
  email: string;
  answer: string;
  newPassword: string;
}
