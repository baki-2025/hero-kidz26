"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children }) => {
    const path = usePathname();
    const isActive = href === "/" ? path === href : path === href || path.startsWith(`${href}/`);

    return (
        <Link
            className={`${isActive ? "text-primary font-semibold" : "text-base-content/80 hover:text-primary"} transition-colors`}
            href={href}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
    );
};

export default NavLink;