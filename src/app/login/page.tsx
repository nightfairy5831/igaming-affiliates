'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[350px] h-[350px] rounded-full bg-secondary-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] rounded-full bg-accent-500/10 blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-8 h-8 text-primary-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold gradient-text font-poppins">
              AffiliateHub
            </span>
          </div>
          <p className="text-sm text-white/50 font-poppins">iGaming Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-1.5 font-poppins"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-1.5 font-poppins"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="gradient-btn w-full text-center font-poppins"
          >
            Sign In
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-3">
          <a
            href="#"
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors font-poppins"
          >
            Forgot password?
          </a>
          <p className="text-sm text-white/40 font-poppins">
            Don&apos;t have an account?{' '}
            <span className="text-white/60 font-medium">Contact Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
