import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={"/"} className='flex items-center gap-1'>
           <Image 
           priority
           alt='hero-hero-kidz' 
           src={"/assets/logo.png"}
           width={50}
           height={40}
           style={{ width: 'auto', height: 'auto' }}
           />
            
           <h2 className='text-xl font-bold'>Hero Kidz</h2>
        </Link>
    );
};

export default Logo;