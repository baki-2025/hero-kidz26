"use client";
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const SocialButton = () => {
    const handleSocialLogin = async () => {
        await signIn('google', { callbackUrl: '/' });
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="divider text-xs text-base-content/50 uppercase">Or continue with</div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleSocialLogin}
                    className="btn btn-outline flex-1 gap-2 hover:bg-primary hover:text-primary-content transition-all duration-300"
                >
                    <FaGoogle className="text-xl" />
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialButton;
