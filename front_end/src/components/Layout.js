// Layout.js
import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Header from "./header";
import Footer from "./footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet /> {/* Outlet will render the matched child route */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
