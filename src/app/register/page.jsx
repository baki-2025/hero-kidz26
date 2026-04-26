"use client";

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/layouts/Logo';
import RegisterForm from '@/components/auth/RegisterForm';
import SocialButton from '@/components/auth/SocialButton';
import { fontBangla } from '../fonts';

const RegisterPage = () => {
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
                <RegisterForm />

                {/* Social Login */}
                <SocialButton />

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
