import { NavigateFunction } from "react-router-dom";
 

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
