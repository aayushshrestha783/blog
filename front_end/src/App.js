// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import AuthPage from "../src/features/auth/authPage";
import BlogPage from "../src/features/blog/blogPage";
import ProfilePage from "../src/features/profile/profilePage";
import Layout from "./components/Layout";
import NotFound from "./components/Error";
import PostBlog from "./features/blog/postBlog";
import EditBlog from "./features/blog/editBlog";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* No Layout for AuthPage */}
        <Route path="/" element={<AuthPage />} />
        {/* Layout applied to the following routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/postBlog" element={<PostBlog />} />
          <Route path="/editBlog/:blogId" element={<EditBlog />} />
        </Route>
        {/* Error route for unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
