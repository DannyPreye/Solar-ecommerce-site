import { navLinks } from "@/utils/contants";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Top = () => {
    return (
        <div className='border-b-[2px] px-5'>
            <div
                className='container flex items-center font-poppins
         justify-between mx-auto py-4 '
            >
                {/* -------- CONTACT INFORMATION --------------- */}
                <div className='flex items-center justify-between gap-4'>
                    <Button className='text-c2a text-[] font-semibold capitalize'>
                        Chat with Us
                    </Button>
                    <Link
                        className=' text-[.6rem] sm:text-[1rem] sm:block '
                        href={"tel:+2349074788888"}
                    >
                        +234 907 478 8888
                    </Link>
                    <Link
                        className='text-[.6rem] sm:text-[1rem]'
                        href={"mailto:info@digitalgadget"}
                    >
                        info@digitalgadget
                    </Link>
                </div>

                {/* ----------- MENUS ----------------- */}
                <div
                    className='lg:flex hidden items-center
             gap-4 justify-between '
                >
                    {navLinks.map((link, id) =>
                        link.linkType ? (
                            <Link
                                key={id}
                                className='text-c2a font-semibold'
                                href={link.link}
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <Button
                                className='bg-c2a text-white rounded-full'
                                variant='contained'
                                key={id}
                            >
                                {link.name}
                            </Button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Top;
