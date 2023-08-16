import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

export interface EachBlogProps {
    title: string;
    date: string;
    image: string;
    alt: string;
    link: string;
    category: string;
}
const EachBlog: FC<EachBlogProps> = ({
    title,
    date,
    image,
    alt,
    link,
    category,
}) => {
    return (
        <Link
            href={link || "#"}
            className='max-w-[500px] flex-col flex h-[400px]
           w-full relative rounded-[12px] justify-end
           overflow-hidden shadow-md'
        >
            <Image src={image} fill alt={alt} className='object-contain' />
            <div
                className='bg-gradient-to-t h-[206px] px-[24px] gap-4
             from-c1a to-transparent w-full flex flex-col justify-center z-10'
            >
                <span className='text-[22px] font-semibold text-white '>
                    {title}
                </span>
                <div className='flex items-center gap-4 '>
                    <span className='text-[12px] text-c1f'>
                        {moment(date).format("DD MMMM, YYYY")}
                    </span>
                    <span
                        className='px-2 py-1 rounded-full
                     bg-c2e text-c2a capitalize  text-[12px] font-semibold '
                    >
                        {category}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default EachBlog;
