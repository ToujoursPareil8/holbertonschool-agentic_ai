import React from "react";
import Header from "./components/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import Insights from "./sections/Insights"


function App() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <Hero />
      <main className="mx-auto max-w-7xl">
        <About />
        <Features />
        <Insights />
        {/*
        <Contact />
        <Footer />
        */}
      </main>
    </div>
    
  );
}

export default App;