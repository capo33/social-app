import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box, Grid } from "@mui/material";

import Header from "./components/Navbar";
import Sidebar from "./components/Sidebar/Index";
import { useAppSelector } from "./redux/app/store";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      {!user && <Header />}
      <Grid container>
        <Grid item md={2}>
          {user && <Sidebar />}
          <Toaster />
        </Grid>
        <Grid item md={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
