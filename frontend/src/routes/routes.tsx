import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App />}></Route>)
);

export default routes;
