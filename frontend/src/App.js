import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Signin from "./Screens/Signin";
import Signup from "./Screens/Signup";
import Home from "./Screens/Home";
import Chat from "./Screens/Chat";
import Apikey from "./Screens/Apikey";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/api" element={<Apikey />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
