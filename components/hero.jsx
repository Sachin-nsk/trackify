"use client";

import React from 'react'
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

const HeroSection = () => {

    
  return (
    <div className='pb-20 px-4'>
        <div className='container mx-auto text-center'>
            <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title'>
                Manage Your Finances
            </h1>
            <p className='text-xl text-grap-600 mb-8 max-w-2xl mx-auto'>
                Smart finance tracking powered by AI -- get real-time insights,
                expense analytics, and spending optimization.
            </p>
            <div className='flex-justify-center space-x-4'>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>
            </div>
            <div className='hero-image-wrapper'>
                <div className='hero-image'>
                    <Image src="/banner.jpeg" width={1280} height={720}
                    alt="Dashboard Image"
                    className='rounded-lg shadow-2xl border mx-auto'
                    priority/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection