<!-- $lib/sections/Contact.svelte -->
<script>
    import { BookOpen, Users, Sparkles, User, AtSign, Mail, ArrowRight } from "@lucide/svelte";
    import Eyebrow from "../components/Eyebrow.svelte";
    import SectionBackground from "../components/SectionBackground.svelte";

    const msgDef = "Fill in the form and we'll get back to you within 24h.";
    const msgSending = "Sending your message...";
    const msgSent = "Message sent! We'll be in touch soon.";

    const highlights = [
        { icon: BookOpen, label: "Project-based learning" },
        { icon: Users, label: "Peer learning environment" },
        { icon: Sparkles, label: "AI-powered workflows" },
    ];

    /** @type {{ name: string, email: string, message: string }} */
    let formData = $state({ name: "", email: "", message: "" });
    let isSending = $state(false);
    let feedback = $state(msgDef);

    let isNameValid = $derived(formData.name.trim().length >= 2);
    let isEmailValid = $derived(formData.email.includes("@") && formData.email.includes("."));
    let isMessageValid = $derived(formData.message.trim().length >= 10);
    let isFormValid = $derived(isNameValid && isEmailValid && isMessageValid);

    const baseInputClasses =
        "w-full px-4 py-2 text-slate-50 rounded-md border border-slate-800 bg-black placeholder:text-slate-500 focus:outline-none transition-colors duration-200";

    /**
     * @param {string} value
     * @param {boolean} isValid
     */
    function focusColorClass(value, isValid) {
        if (value.length === 0) return "focus:border-violet-500";
        return isValid ? "focus:border-violet-500" : "focus:border-red-500";
    }

    $effect(() => {
        if (feedback !== msgSent) return;
        const timer = setTimeout(() => (feedback = msgDef), 4000);
        return () => clearTimeout(timer);
    });

    /** @param {SubmitEvent} e */
    async function handleSubmit(e) {
        e.preventDefault();
        if (!isFormValid || isSending) return;

        isSending = true;
        feedback = msgSending;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        isSending = false;
        feedback = msgSent;
        formData = { name: "", email: "", message: "" };
    }
</script>

<section id="contact-section" class="py-24 bg-black relative overflow-hidden text-white">
    <SectionBackground />

    <div class="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <Eyebrow text="Start your AI journey" />

        <h2 class="text-5xl md:text-7xl font-black tracking-tight leading-none mt-6">
            Ready to Explore
            <br />
            <span class="text-violet-300">Agentic AI?</span>
        </h2>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
                href="https://www.holbertonschool.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm"
            >
                Enroll at Holberton School
                <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
                href="https://www.holbertonschool.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900 text-sm"
            >
                Need more information?
            </a>
        </div>

        <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6">
            {#each highlights as { icon: Icon, label } (label)}
                <li class="flex items-center gap-2">
                    <Icon size={16} class="text-violet-400" aria-hidden="true" />
                    <span class="text-sm text-slate-400">{label}</span>
                </li>
            {/each}
        </ul>

        <div class="w-full p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 mt-10 text-left">
            <form onsubmit={handleSubmit} autocomplete="off" novalidate>
                <div class="mb-5">
                    <label for="contact-name" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                        <User size={16} class="text-violet-400" aria-hidden="true" />
                        Full name
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autocomplete="off"
                        placeholder="Your full name..."
                        bind:value={formData.name}
                        class={`${baseInputClasses} ${focusColorClass(formData.name, isNameValid)}`}
                    />
                </div>

                <div class="mb-5">
                    <label for="contact-email" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                        <AtSign size={16} class="text-violet-400" aria-hidden="true" />
                        Email
                    </label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autocomplete="off"
                        placeholder="you@example.com"
                        bind:value={formData.email}
                        class={`${baseInputClasses} ${focusColorClass(formData.email, isEmailValid)}`}
                    />
                </div>

                <div class="mb-6">
                    <label for="contact-message" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                        <Mail size={16} class="text-violet-400" aria-hidden="true" />
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        autocomplete="off"
                        placeholder="Tell us about your project or learning goals!"
                        bind:value={formData.message}
                        class={`${baseInputClasses} resize-none ${focusColorClass(formData.message, isMessageValid)}`}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isSending}
                    class="w-full px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-500 transition-colors"
                >
                    {isSending ? "Sending..." : "Send message"}
                </button>

                <p class="text-sm text-slate-400 mt-4 text-center" role="status">
                    {feedback}
                </p>
            </form>
        </div>
    </div>
</section>