"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '@/components/layouts/Logo';
import SocialLogin from '@/components/buttons/SocialLogin';
import { fontBangla } from '../fonts';

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // Form validation
        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            // Placeholder for registration logic (to be integrated with backend)
            console.log("Registration attempt:", { name, email, password });
            
            // Simulating a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success("Account created successfully!");
            router.push('/login');
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
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
                        নতুন একাউন্ট খুলুন
                    </h2>
                    <p className="mt-2 text-sm text-base-content/70">
                        Join Hero-Kidz and start shopping for your kids
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                                    <FaUser />
                                </span>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all duration-300 rounded-xl"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

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
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
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
                            <p className="text-[10px] text-base-content/50 mt-1 px-1">
                                Must be at least 6 characters long
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-full rounded-xl gap-2 transition-all duration-300 shadow-lg shadow-primary/20 ${loading ? 'loading' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </div>
                </form>

                {/* Social Login */}
                <SocialLogin />

                {/* Footer Link */}
                <p className="text-center text-sm text-base-content/70 mt-6">
                    Already have an account?{' '}
                    <Link 
                        href="/login" 
                        className="font-bold text-primary hover:underline transition-all"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
