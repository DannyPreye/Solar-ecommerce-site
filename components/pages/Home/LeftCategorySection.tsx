"use client";
import { ProductCategoryDocument } from "@/prismicio-types";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    sectionTitle: string;
    moreCategoryLink?: string;
    categories: ProductCategoryDocument<string>[];
    linkText?: string;
    addMoreButton?: boolean;
}
const CategorySection = ({
    sectionTitle,
    moreCategoryLink,
    categories,
    linkText,
    addMoreButton,
}: Props) => {
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
                        href={`/category/${category?.uid}`}
                        key={`${category.id}`}
                    >
                        {category?.data?.title}
                    </Link>
                ))}
            </div>

            {addMoreButton && (
                <Button
                    onClick={() => router.push(moreCategoryLink as string)}
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

export default CategorySection;
