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
  name: string;
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

export interface Icomments {
  comment: string;
  postedBy?: {
    name: string;
    _id: string;
  };
  _id?: string;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  comments: Icomments[];

  postedBy?: {
    name: string;
    _id?: string;
  };
}

export interface userProfileData {
  user?: IUser;
  posts?: IPost[];
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
