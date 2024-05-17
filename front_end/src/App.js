import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/hero";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
