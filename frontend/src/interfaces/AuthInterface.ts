export type NotificationType = {
  _id?: string;
  title: string;
  description: string;
  name: string;
};
export interface User {
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

export interface comments {
  comment: string;
  postedBy?: {
    name: string;
    _id: string;
  };
  _id?: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  comments: comments[];

  postedBy?: {
    name: string;
    _id?: string;
  };
}

export interface userProfileData {
  user?: User;
  posts?: Post[];
}

export interface AuthUser {
  email: string;
  password: string;
  name?: string;
}

export interface Auth {
  formData: AuthUser;
  navigate: any;
  toast?: any;
}
