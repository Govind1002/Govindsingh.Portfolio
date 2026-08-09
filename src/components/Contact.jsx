import React, { useState } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    if (onShowToast) {
      onShowToast(
        'error',
        'Incomplete form',
        'Please fill in your name, email, and message before sending.'
      );
    }
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch(
      'https://formsubmit.co/ajax/gauravsingh25864@gmail.com',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Portfolio Inquiry',
          message: formData.message,

          _subject: `Portfolio Contact - ${formData.name}`,
          _template: 'table',
          _replyto: formData.email,

          // CAPTCHA enabled
          _captcha: 'true',

          // Honeypot spam protection
          _honey: '',

          // Current website URL
          _url: window.location.href,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to send message');
    }

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    if (onShowToast) {
      onShowToast(
        'success',
        'Message sent',
        'Thanks for reaching out! Your message has been sent successfully.'
      );
    }

  } catch (err) {
    console.error('FormSubmit Error:', err);

    if (onShowToast) {
      onShowToast(
        'error',
        'Message not sent',
        'Something went wrong. Please try again.'
      );
    }

  } finally {
    setIsSubmitting(false);
  }
};
  const socialChannels = [
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/govind-singh-5b6473296/', color: 'hover:bg-[#0077B5] hover:border-[#0077B5] hover:shadow-[0_0_30px_rgba(0,119,181,0.4)]', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/Govind1002', color: 'hover:bg-white hover:border-white hover:text-zinc-950 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]', label: 'GitHub' },
    { icon: <FaEnvelope />, url: 'mailto:gauravsingh25864@gmail.com', color: 'hover:bg-luxury-yellow hover:border-luxury-yellow hover:text-zinc-950 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]', label: 'Email' },
    { icon: <FaPhone />, url: 'tel:+918299068146', color: 'hover:bg-green-500 hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]', label: 'Phone' },
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col justify-center items-center"
    >
      <div className="absolute inset-x-0 top-[40%] flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="font-display font-black text-[22vw] text-white/5 opacity-[0.02] tracking-tighter uppercase leading-none">
          CONNECT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">

        {/* Left Side */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">Get In Touch!</span>
            <h3 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              Let's Talk
            </h3>
          </div>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
            Have a project, idea, or collaboration in mind? I'm open to full-stack development opportunities and creative tech work. Don't hesitate to reach out!
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {socialChannels.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                aria-label={platform.label}
                className={`w-12 h-12 rounded-full border-2 border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 ${platform.color}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <FaEnvelope className="text-luxury-yellow" />
              <a href="mailto:gauravsingh25864@gmail.com" className="hover:text-white transition-colors underline">
                gauravsingh25864@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <FaPhone className="text-luxury-yellow" />
              <a href="tel:+918299068146" className="hover:text-white transition-colors underline">
                +91 82990 68146
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-6 w-full">
          <form
            onSubmit={handleFormSubmit}
            className="w-full max-w-2xl bg-zinc-900/40 border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-display">Name</label>
                <input
                  type="text" required placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-display">Email</label>
                <input
                  type="email" required placeholder="example@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-display">Subject</label>
              <input
                type="text" placeholder="Project Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-display">Message</label>
              <textarea
                required rows="5" placeholder="Tell me about your idea!"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
              />
            </div>
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-display font-bold uppercase tracking-widest py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
