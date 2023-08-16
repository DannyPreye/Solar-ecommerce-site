"use client";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface Props {
    sectionTitle: string;
    moreCategoryLink?: string;
    categories: any[];
    linkText?: string;
    addMoreButton?: boolean;
}
const LeftSection: FC<Props> = ({
    sectionTitle,
    moreCategoryLink,
    categories,
    linkText,
    addMoreButton,
}) => {
    const router = useRouter();

    return (
        <div className='flex flex-col '>
            <h3 className='mb-[16px] font-semibold font-poppins text-[18px]'>
                {sectionTitle}
            </h3>
            <div className='mb-[48px] flex flex-col gap-3'>
                {categories?.map((category, id) => (
                    <Link
                        className='text-c2a underline'
                        // href='/cateogory/[...category]'
                        href={`/category/${category?.data?.parent_category?.uid}/${category.uid}`}
                        key={`${sectionTitle}_${id}`}
                    >
                        {category?.data?.title}
                    </Link>
                ))}
            </div>

            {addMoreButton && (
                <Button
                    onClick={() => {}}
                    className='bg-c1f text-c1a font-poppins
                capitalize font-bold rounded-[12px] w-fit'
                    endIcon={<KeyboardArrowRightOutlined />}
                >
                    {linkText}
                </Button>
            )}
        </div>
    );
};

export default LeftSection;
