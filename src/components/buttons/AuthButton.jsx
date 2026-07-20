"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthButton = () => {
    const session = useSession();
    return (
        <div>
            {session.status == "authenticated" ? (
                <>
                <button onClick={() => signOut()} className='btn btn-primary'>
                    Logout
                </button>
                </>
            ):(
                <>
                <Link href={"/login"} className='btn btn-outline btn-primary'>
                Login
                </Link>
                </>
            )}
        </div>
    );
};

export default AuthButton;