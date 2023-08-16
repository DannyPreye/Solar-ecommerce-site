import React from "react";
import LeftCategory from "@/components/atoms/LeftCategory";
import { Button } from "@mui/material";

const categories = ["Solar Energy", "Security", "Gadgets"];
const LeftSection = () => {
    return (
        <div className='flex flex-col mt-6 gap-5 lg:mt-0 w-[268px]'>
            <LeftCategory sectionTitle='Categories' categories={categories} />

            <div>
                <h2 className='mb-[16px] font-poppins font-semibold  text-[18px]'>
                    Join our List
                </h2>
                <p className='text-c1c font-open-sans text-[14px] '>
                    Signup to be the first to hear about exclusive deals,
                    special offers, recepies from our masters and others.
                </p>
                <div
                    className='mt-[24px]  h-[42px] w-full
                flex justify-between   border-2 border-c1c rounded-full overflow-hidden'
                >
                    <input
                        type='email'
                        className='px-3 h-full focus:outline-none
                        bg-transparent w-[70%]'
                        placeholder='Your email address'
                    />
                    <Button className='capitalize text-c1a font-bold font-poppins '>
                        Subscribe
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LeftSection;
