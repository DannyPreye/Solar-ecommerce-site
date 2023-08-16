import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
    title: string;
    description?: string;
    price: number;
    img: string;
    oldPrice: number;
    productLink: string;
}
const Product = ({
    title,
    description,
    price,
    oldPrice,
    img,
    productLink,
}: Props) => {
    const discountPrice = ((oldPrice - price) / oldPrice) * 100;
    return (
        <Link
            href={productLink || "/product"}
            className='w-full lg:max-w-[269px]  shadow-sm
         rounded-[12px] bg-white flex flex-col gap-[16px] p-[16px] border-[1px] border-c1d
           duration-700'
        >
            <div className='bg-white h-[180px] rounded-[12px] relative overflow-hidden'>
                <Image src={img} alt={title} fill className='object-contain' />

                <span className='absolute left-[5%] px-2 rounded-full bg-c2d top-[5%] font-semibold text-[12px] text-c2a'>
                    - {discountPrice.toFixed(1)}%
                </span>
            </div>
            <div className='flex flex-col gap-[12px]'>
                <div>
                    <span className='font-bold'>{title}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='font-semibold  text-c2a text-[18px]'>
                        &#8358;{price}
                    </span>
                    <span className=' line-through text-c1b text-[12px]'>
                        &#8358;{oldPrice}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default Product;
