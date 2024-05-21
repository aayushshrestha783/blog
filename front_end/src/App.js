// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import AuthPage from "./components/authPage";
import About from "./components/blogPage";
import ProfilePage from "./components/profilePage";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* No Layout for AuthPage */}
        <Route path="/" element={<AuthPage />} />
        {/* Layout applied to the following routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* Error route for unknown paths */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
