"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '@/components/layouts/Logo';
import SocialLogin from '@/components/buttons/SocialLogin';
import { fontBangla } from '../fonts';

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Form validation
        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            // Placeholder for login logic (to be integrated with backend)
            console.log("Login attempt:", { email, password });
            
            // Simulating a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success("Login successful!");
            router.push('/');
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 transition-all hover:shadow-primary/10">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <h2 className={`${fontBangla.className} text-3xl font-extrabold text-base-content`}>
                        আবার স্বাগতম!
                    </h2>
                    <p className="mt-2 text-sm text-base-content/70">
                        Please sign in to your Hero-Kidz account
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email Address</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                                    <FaEnvelope />
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all duration-300 rounded-xl"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <div className="flex justify-between items-center pr-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs text-primary hover:underline transition-all"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                                    <FaLock />
                                </span>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all duration-300 rounded-xl"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-full rounded-xl gap-2 transition-all duration-300 shadow-lg shadow-primary/20 ${loading ? 'loading' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                {/* Social Login */}
                <SocialLogin />

                {/* Footer Link */}
                <p className="text-center text-sm text-base-content/70 mt-6">
                    Don't have an account?{' '}
                    <Link 
                        href="/register" 
                        className="font-bold text-primary hover:underline transition-all"
                    >
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
