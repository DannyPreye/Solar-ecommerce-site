"use client";
import { Card } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
    "/assets/hero-images/banner-2.png",
    "/assets/hero-images/banner-3.png",
    "/assets/hero-images/ads-1.png",
    "/assets/hero-images/ads-2.png",
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!(currentSlide >= images.length - 1)) {
                setCurrentSlide((prev) => prev + 1);
            } else {
                setCurrentSlide(0);
            }
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [currentSlide]);

    return (
        <section className='px-5 mt-12'>
            <div className='container mx-auto flex gap-4'>
                <div className='duration-700 shadow-md overflow-hidden w-full flex-1 h-[500px] relative'>
                    <div
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                            transition: "all 2s",
                        }}
                        className={`relative  h-full
                    flex   rounded-md translate-x-[-${currentSlide * 100}]
                    `}
                    >
                        {images.map((image, id) => (
                            <div
                                key={id}
                                className='w-full h-full relative flex-shrink-0'
                            >
                                <Image
                                    fill
                                    className='object-contain'
                                    src={image}
                                    alt=''
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            transition: "all 2s",
                        }}
                        className='absolute bottom-10 w-full  left-[50%] translate-x-[-50%] justify-center flex gap-1'
                    >
                        {images.map((_, index) => (
                            <span
                                onClick={() => setCurrentSlide(index)}
                                key={index}
                                className={`bg-gradient-to-tr hover:from-slate-400
                                cursor-pointer hover:to-c2a from-black ${
                                    currentSlide == index &&
                                    "from-slate-400 to-c2b"
                                }
                                 to-slate-400 h-4 w-4 rounded-full`}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className=' hidden lg:grid gap-3'>
                    <div className=' bg-red-300 w-[350px] rounded-md relative '>
                        <Image
                            fill
                            className='object-contain'
                            src={"/assets/hero-images/ads-1.png"}
                            alt=''
                        />
                    </div>
                    <div className=' bg-red-300 w-[350px] relative rounded-md '>
                        <Image
                            fill
                            className='object-contain'
                            src={"/assets/hero-images/ads-2.png"}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
