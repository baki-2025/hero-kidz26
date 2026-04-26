"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { signIn } from 'next-auth/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            await Swal.fire({
                icon: 'error',
                title: 'Required',
                text: 'Please fill in all fields',
            });
            setLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                username: email,
                password,
                callbackUrl: '/',
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            await Swal.fire({
                icon: 'success',
                title: 'Login successful',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            router.push('/');
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error.message || "Login failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
};

export default LoginForm;
