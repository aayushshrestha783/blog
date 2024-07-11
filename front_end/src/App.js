// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import AuthPage from "../src/features/auth/authPage";
import BlogPage from "../src/features/blog/blogPage";
import ProfilePage from "../src/features/profile/profilePage";
import AuthorPage from "../src/features/profile/authorPage";
import Layout from "./components/Layout";
import NotFound from "./components/Error";
import PostBlog from "./features/blog/postBlog";
import EditBlog from "./features/blog/editBlog";
import EditUser from "./features/profile/editProfile";
import Unauthorized from "./components/Unauthorized";
import About from "./features/About_me/About_Me";
import { UserProvider } from "./components/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
              path="/unauthorized"
              element={
                <Unauthorized
                  message="Unauthorized Access"
                  linkText="Go to Login"
                  linkTo="/"
                />
              }
            />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:blogId" element={<BlogPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blog/author/:authorId" element={<AuthorPage />} />
              <Route path="/postBlog" element={<PostBlog />} />
              <Route path="/editBlog/:blogId" element={<EditBlog />} />
              <Route path="/editUser" element={<EditUser />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
