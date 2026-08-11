import React from "react";


{/*
    Semantic HTML components for the header of the application.
    fixed top-0 left-0 w-full pins  to the top
    z-50 ensures it is above other content
*/}
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-slate-50 z-50">
        <div className="flex items-center px-8 py-4 max-w-7xl mx-auto w-full"> 
            {/*logo*/}
            <div className="flex-1 flex items-center gap-3">
                <img src="./icon.svg" alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-lg text-white">Agentic AI</span>
            </div>
            <div className="flex items-center gap-8">
            {/*Semantic <nav> element for navigation*/}
                <nav className="md:flex hidden items-center gap-8 text-sm font-medium text-slate-500">
                    <a href="#about-section" className="hover:text-slate-300">About</a>
                    <a href="#features-section" className="hover:text-slate-300">Features</a>
                    <a href="#insights-section" className="hover:text-slate-300">Insights</a>
                    <a href="#contact-section" className="hover:text-slate-300">Contact</a>
                </nav>
                <div>
                    <a href="#enroll-section" className="bg-violet-500 text-slate-50 text-sm font-semibold py-2 px-4 rounded-md hover:bg-violet-600">Enroll now</a>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;