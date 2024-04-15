import './App.css';
import Navbar from './components/Navbar';
import { Container } from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Error from './components/Error';
import Register from './components/Register';
import Home from './components/Home';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useEffect, useState } from "react";

export const UserContextProvider = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#003691",
      },
    },
  });

  return (
    <>
      <UserContextProvider.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <Container sx={{ marginTop: "6%" }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </UserContextProvider.Provider>
    </>
  );
}

export default App;
