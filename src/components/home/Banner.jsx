import { fontBangla } from '@/app/layout';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex flex-col-reverse lg:flex-row items-center gap-10 py-10'>
            
            {/* Left Side */}
            <div className='flex-1 space-y-5 text-center lg:text-left'>
                <h2 className={`${fontBangla.className} text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight`}>
                    আপনার শিশুকে দিন একটি <br /> 
                    <span className='text-primary'>সুন্দর ভবিষ্যৎ</span>
                </h2>

                <p className='text-sm sm:text-base'>
                    Buy every toy with upto 15% discount
                </p>

                <button className='btn btn-primary btn-outline'>
                    Explore Products
                </button>
            </div>

            {/* Right Side */}
            <div className='flex-1 flex justify-center lg:justify-end'>
                <Image 
                    alt="Buy every toy with upto 15% discount" 
                    src={"/assets/hero.png"} 
                    width={500} 
                    height={400}
                    className='w-[250px] sm:w-[350px] lg:w-[500px] h-auto'
                />
            </div>

        </div>
    );
};

export default Banner;