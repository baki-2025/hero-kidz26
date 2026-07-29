"use client";

import React from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const SocialButton = () => {
  const handleSocialLogin = async () => {
    try {
      // Loading Alert
      Swal.fire({
        title: "Signing in...",
        text: "Please wait while we connect your Google account.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await signIn("google", {
        callbackUrl: "/",
      });

      // This usually won't run because signIn redirects.
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="divider text-xs text-base-content/50 uppercase">
        Or continue with
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSocialLogin}
          className="btn btn-outline btn-primary w-full rounded-xl gap-2 transition-all duration-300 shadow-lg shadow-primary/20 "
        >
          <FaGoogle className="text-xl" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialButton;