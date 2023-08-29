import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from "@mui/material/Container";

import Header from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <main className='py-3'>
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;
