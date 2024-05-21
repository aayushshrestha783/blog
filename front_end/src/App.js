// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/hero";
import AuthPage from "./components/authPage";
import About from "./components/blogPage";
import ProfilePage from "./components/profilePage";
import Layout from "./components/Layout";
import NotFound from "./components/Error";
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
