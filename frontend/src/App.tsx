import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import Header from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;
