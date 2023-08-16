import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
    category: string;
    title: string;
    date: string;
    img: string;
    alt?: string;
    link: string;
}
const EachSmallBlog: FC<Props> = ({
    link,
    img,
    alt,
    title,
    date,
    category,
}) => {
    return (
        <Link
            href={link || "#"}
            className='w-full max-w-[269px] font-poppins h-full block'
        >
            <div className='w-full h-[180px] bg-c1f relative rounded-[12px]'>
                <Image
                    fill
                    className='object-contain'
                    src={img}
                    alt={alt || title}
                />
            </div>
            <div className='mt-[24px] '>
                <span
                    className='px-2 py-1 rounded-full
                capitalize bg-c2e text-c2a  text-[12px] font-semibold '
                >
                    {category}
                </span>
                <h4 className='font-semibold text-[18px] text-c1a mt-[8px]'>
                    {title}
                </h4>
                <span className='text-[12px] text-c1c mt-3 block'>
                    {moment(date).format("DD MMMM, YYYY")}
                </span>
            </div>
        </Link>
    );
};

export default EachSmallBlog;
