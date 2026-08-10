'use client';

import { useState, FormEvent } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // මෙතැනට ඔයාගේ Form API / Backend endpoint එක එකතු කරන්න (eg. Web3Forms, Resend, or API route)
      // Example with Web3Forms or custom API:
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm ${
    isDarkMode
      ? 'bg-[#171923] border-gray-700 text-white placeholder-gray-500 focus:border-[#DD6B20]'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#DD6B20]'
  }`;
  const labelClasses = `block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`;

  return (
    <div
      className={`max-w-xl mx-auto p-8 rounded-2xl border shadow-xl transition-colors duration-300 ${
        isDarkMode ? 'bg-[#2D3748] border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#1A365D]'}`}>
        Get in Touch
      </h2>
      <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Send a message and I'll get back to you as soon as possible.
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-xl text-sm font-semibold">
          Message sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl text-sm font-semibold">
          Something went wrong. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project Inquiry / General Question"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-6 bg-[#DD6B20] hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}