<!-- $lib/components/Header.svelte -->
<!--
    Semantic HTML components for the header of the application.
    fixed top-0 left-0 w-full pins  to the top
    z-50 ensures it is above other content
--> <!--[cite: 12] -->
<header class="fixed top-0 left-0 w-full bg-black text-slate-50 z-50"> <!--[cite: 12] -->
    <div class="flex items-center px-8 py-4 max-w-7xl mx-auto w-full"> <!--[cite: 12] -->
        <!--logo--> <!--[cite: 12] -->
        <div class="flex-1 flex items-center gap-3"> <!--[cite: 12] -->
            <img src="./icon.svg" alt="Logo" class="w-8 h-8" /> <!--[cite: 12] -->
            <span class="font-bold text-lg text-white">Agentic AI</span> <!--[cite: 12] -->
        </div> <!--[cite: 12] -->
        <div class="flex items-center gap-8"> <!--[cite: 12] -->
        <!--Semantic <nav> element for navigation--> <!--[cite: 12] -->
            <nav class="md:flex hidden items-center gap-8 text-sm font-medium text-slate-500"> <!--[cite: 12] -->
                <a href="#about-section" class="hover:text-slate-300">About</a> <!--[cite: 12] -->
                <a href="#features-section" class="hover:text-slate-300">Features</a> <!--[cite: 12] -->
                <a href="#insights-section" class="hover:text-slate-300">Insights</a> <!--[cite: 12] -->
                <a href="#contact-section" class="hover:text-slate-300">Contact</a> <!--[cite: 12] -->
            </nav> <!--[cite: 12] -->
            <div> <!--[cite: 12] -->
                <a href="#enroll-section" class="bg-violet-500 text-slate-50 text-sm font-semibold py-2 px-4 rounded-md hover:bg-violet-600">Enroll now</a> <!--[cite: 12] -->
            </div> <!--[cite: 12] -->
        </div> <!--[cite: 12] -->
    </div> <!--[cite: 12] -->
</header> <!--[cite: 12] -->