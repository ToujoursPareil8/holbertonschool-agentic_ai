import React from "react";


{/*
    Semantic HTML components for the header of the application.
    fixed top-0 left-0 w-full pins  to the top
    z-50 ensures it is above other content
*/}
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-slate-50 z-50">
        <div className="flex justify-between items-center px-6 py-4"> 
            {/*logo*/}
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-lg font-bold">Agentic AI</span>
            </div>

            {/*Semantic <nav> element for navigation*/}
            <nav className="flex justify-center gap-4 text-sm font-medium text-slate-500">
                <a href="#about" className="hover:text-slate-300">About</a>
                <a href="#features" className="hover:text-slate-300">Features</a>
                <a href="#insights" className="hover:text-slate-300">Insights</a>
                <a href="#contact" className="hover:text-slate-300">Contact</a>
            </nav>
            <div>
                <a href="#enroll" className="bg-violet-500 text-slate-50 text-sm font-semibold py-2 px-4 rounded-md hover:bg-violet-600">Enroll now</a>
            </div>
        </div>
    </header>
  );
};

export default Header;