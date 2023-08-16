import Image from "next/image";
import React, { FC } from "react";
import LeftSection from "./LeftSection";
import moment from "moment";

import { TurnLeft } from "@mui/icons-material";
import Link from "next/link";
import { BlogDocument } from "@/prismicio-types";
import RichText from "@/components/atoms/RichText";

interface Props {
    blogDetail: BlogDocument;
}
const Details = ({ blogDetail }: Props) => {
    return (
        <main className='container mx-auto px-5 mt-12'>
            <div
                className='h-[460px]  relative
              rounded-[12px]  flex flex-col items-center justify-end overflow-hidden'
            >
                <Image
                    src={blogDetail?.data?.featured_image?.url as string}
                    fill
                    alt={
                        (blogDetail?.data?.featured_image?.alt as string) ||
                        (blogDetail?.data?.title as string)
                    }
                    className='object-contain'
                />
                <div
                    className='flex w-full py-8 justify-center px-5 lg:px-0 lg:items-end
                    gap-8 bg-gradient-to-t from-c1a to-transparent
                relative flex-col-reverse lg:flex-row'
                >
                    <div className='flex items-start flex-col gap-3 pb-2'>
                        <div className='flex gap-6'>
                            <span className='text-c1d'>Date:</span>
                            <span className='text-c1f font-semibold'>
                                {moment(
                                    blogDetail?.first_publication_date
                                ).format("DD MMM, YYYY")}
                            </span>
                        </div>
                        <div className='flex gap-6'>
                            <span className='text-c1d'>Category:</span>
                            {/* <span className='text-c1e font-semibold capitalize'>
                                {blogDetail?.data?.category?.slug as string}
                            </span> */}
                        </div>
                    </div>
                    <h1
                        className='font-semibold my-0 w-full max-w-[500px]
                     font-poppins text-[32px] text-c1f'
                    >
                        {blogDetail?.data?.title}
                    </h1>
                </div>
            </div>

            <div className='w-full max-w-[80%] mx-auto flex lg:flex-nowrap gap-8 mt-12 flex-wrap-reverse '>
                <div className='w-full mx-w-[400px]'>
                    <LeftSection />
                    <Link
                        href='/blog'
                        className='flex  mt-8 font-semibold items-center'
                    >
                        <TurnLeft /> <span>Back to blog</span>
                    </Link>
                </div>
                <div>
                    <RichText field={blogDetail.data.long_description} />
                    {/* {blogDetail?.data.slices.map((slice, index) => {
                        switch (slice.slice_type) {
                            case "blog_content":
                                return (
                                    <BlogContent index={index} slice={slice} />
                                );
                            case "blockquote":
                                return (
                                    <Blockquote index={index} slice={slice} />
                                );
                            default:
                                return null;
                        }
                    })} */}
                </div>
            </div>
        </main>
    );
};

export default Details;
