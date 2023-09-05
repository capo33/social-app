import App from "../App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, AddPost } from "../pages/home/Index";
<<<<<<< HEAD
import {
  Notifications,
  Profile,
  UpdateProfile,
  UserProfile,
} from "../pages/User/Index";
import { ForgotPassword, Login, Register } from "../pages/auth/Index";
import PostDetails from "../pages/Post/PostDetails";
import SavedPosts from "../pages/Post/SavedPosts";
=======
import { Profile, UpdateProfile, UserProfile } from "../pages/User/Index";
import { ForgotPassword, Login, Register } from "../pages/auth/Index";
>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='profile' element={<Profile />} />
      <Route path='create-post' element={<AddPost />} />
      <Route path='update-profile' element={<UpdateProfile />} />
      <Route path='profile/:id' element={<UserProfile />} />
<<<<<<< HEAD
      <Route path='notifications' element={<Notifications />} />
      <Route path='savedPosts' element={<SavedPosts />} />
      <Route path=':title/:id' element={<PostDetails />} />
=======
>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
    </Route>
  )
);

export default routes;
