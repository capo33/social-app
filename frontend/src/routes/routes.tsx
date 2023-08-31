import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ForgotPassword, Login, Register } from "../pages/auth/Index";
import Home from "../pages/home/Index";
import Profile from "../pages/User/Index";
import AddPost from "../components/AddPost/AddPost";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='create-post' element={<AddPost />} />
    </Route>
  )
);

export default routes;
