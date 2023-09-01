import {  IUserProfileData } from "../../interfaces/UserInterface";

const user = JSON.parse(localStorage.getItem("user") as string);

interface AccountState {
  user: IUserProfileData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export const initialState: AccountState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
