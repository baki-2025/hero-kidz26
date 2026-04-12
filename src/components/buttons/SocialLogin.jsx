import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const handleSocialLogin = (platform) => {
        // Placeholder for social login logic
        console.log(`Logging in with ${platform}`);
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="divider text-xs text-base-content/50 uppercase">Or continue with</div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => handleSocialLogin('Google')}
                    className="btn btn-outline flex-1 gap-2 hover:bg-primary hover:text-primary-content transition-all duration-300"
                >
                    <FaGoogle className="text-xl" />
                    <span>Google</span>
                </button>

            </div>
        </div>
    );
};

export default SocialLogin;
