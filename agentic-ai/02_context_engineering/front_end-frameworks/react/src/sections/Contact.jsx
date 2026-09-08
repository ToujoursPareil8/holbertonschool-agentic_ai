import React, { useState, useEffect } from "react";
import { BookOpen, Users, Sparkles, User, AtSign, Mail, ArrowRight } from "lucide-react";
import Eyebrow from "../components/Eyebrow";
import SectionBackground from "../components/SectionBackground";

const msgDef = "Fill in the form and we'll get back to you within 24h.";
const msgSending = "Sending your message...";
const msgSent = "Message sent! We'll be in touch soon.";

const highlights = [
    { icon: BookOpen, label: "Project-based learning" },
    { icon: Users, label: "Peer learning environment" },
    { icon: Sparkles, label: "AI-powered workflows" },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [feedback, setFeedback] = useState(msgDef);

    const isNameValid = formData.name.trim().length >= 2;
    const isEmailValid = formData.email.includes("@") && formData.email.includes(".");
    const isMessageValid = formData.message.trim().length >= 10;
    const isFormValid = isNameValid && isEmailValid && isMessageValid;

    useEffect(() => {
        if (feedback !== msgSent) return;
        const timer = setTimeout(() => setFeedback(msgDef), 4000);
        return () => clearTimeout(timer);
    }, [feedback]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || isSending) return;

        setIsSending(true);
        setFeedback(msgSending);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSending(false);
        setFeedback(msgSent);
        setFormData({ name: "", email: "", message: "" });
    };

    const focusColorClass = (value, isValid) => {
        if (value.length === 0) return "focus:border-violet-500";
        return isValid ? "focus:border-violet-500" : "focus:border-red-500";
    };

    const baseInputClasses =
        "w-full px-4 py-2 text-slate-50 rounded-md border border-slate-800 bg-black placeholder:text-slate-500 focus:outline-none transition-colors duration-200";

    return (
        <section id="contact-section" className="py-24 bg-black relative overflow-hidden text-white">
            <SectionBackground />

            <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <Eyebrow text="Start your AI journey" />

                <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none mt-6">
                    Ready to Explore
                    <br />
                    <span className="text-violet-300">Agentic AI?</span>
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <a
                        href="https://www.holbertonschool.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm"
                    >
                        Enroll at Holberton School
                        <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <a
                        href="https://www.holbertonschool.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900 text-sm"
                    >
                        Need more information?
                    </a>
                </div>

                <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6">
                    {highlights.map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-center gap-2">
                            <Icon size={16} className="text-violet-400" aria-hidden="true" />
                            <span className="text-sm text-slate-400">{label}</span>
                        </li>
                    ))}
                </ul>

                <div className="w-full p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 mt-10 text-left">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <div className="mb-5">
                            <label htmlFor="contact-name" className="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                                <User size={16} className="text-violet-400" aria-hidden="true" />
                                Full name
                            </label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                placeholder="Your full name..."
                                value={formData.name}
                                onChange={handleChange}
                                className={`${baseInputClasses} ${focusColorClass(formData.name, isNameValid)}`}
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="contact-email" className="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                                <AtSign size={16} className="text-violet-400" aria-hidden="true" />
                                Email
                            </label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${baseInputClasses} ${focusColorClass(formData.email, isEmailValid)}`}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="contact-message" className="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
                                <Mail size={16} className="text-violet-400" aria-hidden="true" />
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={4}
                                autoComplete="off"
                                placeholder="Tell us about your project or learning goals!"
                                value={formData.message}
                                onChange={handleChange}
                                className={`${baseInputClasses} resize-none ${focusColorClass(formData.message, isMessageValid)}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || isSending}
                            className="w-full px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-500 transition-colors"
                        >
                            {isSending ? "Sending..." : "Send message"}
                        </button>

                        <p className="text-sm text-slate-400 mt-4 text-center" role="status">
                            {feedback}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
