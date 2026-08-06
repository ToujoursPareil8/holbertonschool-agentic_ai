import React from "react";
import Header from "./components/Header";
import Hero from "./sections/Hero";


function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <Hero />
      <main className="mx-auto max-w-7xl">
        {/*
        <About />
        <Features />
        <Insights />
        <Contact />
        <Footer />
        */}
      </main>
    </div>
    
  );
}

export default App;