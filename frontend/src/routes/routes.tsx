import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ForgotPassword, Login, Register } from "../pages/auth/Index";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

    </Route>
  )
);

export default routes;
