import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Container, Box } from "@mui/material";


import Header from "./components/Navbar";
import Sidebar from "./components/Sidebar/Index";
import { useAppSelector } from "./redux/app/store";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      {user ? <Sidebar /> : <Header />}
      <Toaster />
      <Container maxWidth='md' sx={{ marginBottom: "5rem" }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
