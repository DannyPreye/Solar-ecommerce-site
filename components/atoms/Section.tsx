"use client";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

interface Props {
    sectionHeadline: string;
    buttonTitle: string;
    buttonLink: string;
}
const SectionHeading: FC<Props> = ({
    sectionHeadline,
    buttonLink,
    buttonTitle,
}) => {
    const router = useRouter();
    return (
        <div
            className='flex
    items-center justify-between '
        >
            <h2 className='font-semibold text-c1a text-[18px] font-poppins'>
                {sectionHeadline}
            </h2>
            <Button
                onClick={() => router.push(buttonLink)}
                endIcon={<KeyboardArrowRightOutlined />}
                className='capitalize font-bold text-c1a '
            >
                {buttonTitle}
            </Button>
        </div>
    );
};

export default SectionHeading;
