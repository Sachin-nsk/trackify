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
            <div className='flex justify-center mt-10'>
              <div className='hero-image-wrapper rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden transform transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-black/40 backdrop-blur-lg max-w-3xl w-full'>
                <Image 
                  src="/banner3.jpg" 
                  width={900} 
                  height={600}
                  alt="Finance Dashboard Illustration"
                  className='w-full h-auto object-cover rounded-3xl transition-transform duration-700 ease-in-out scale-100 hover:scale-105' 
                  priority
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection