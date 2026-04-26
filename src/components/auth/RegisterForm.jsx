"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
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

        if (!name || !email || !password) {
            await Swal.fire({
                icon: 'error',
                title: 'Required',
                text: 'Please fill in all fields',
            });
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            await Swal.fire({
                icon: 'error',
                title: 'Invalid password',
                text: 'Password must be at least 6 characters long',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed. Please try again.');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Account created',
                text: data.message || 'Account created successfully!',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
            });
            router.push('/login');
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.message || "Registration failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
};

export default RegisterForm;
