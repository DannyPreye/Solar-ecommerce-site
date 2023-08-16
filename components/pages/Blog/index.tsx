import React, { FC } from "react";
import HeroSection from "./HeroSection";
import LeftSection from "./LeftSection";
import EachSmallBlog from "./EachSmallBlogPost";
import Link from "next/link";
import { Button } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { BlogCategoryDocument, BlogDocument } from "@/prismicio-types";

interface Props {
    posts: BlogDocument<string>[];
}
const index: FC<Props> = ({ posts }) => {
    return (
        <>
            <HeroSection blogPosts={posts.slice(0, 2)} />
            <div
                className=' container mx-auto px-5 gap-8
            flex justify-between items-start mt-8 lg:flex-nowrap flex-wrap-reverse'
            >
                <LeftSection />
                <div className='flex flex-wrap justify-center lg:justify-start gap-8 lg:items-stretch'>
                    {posts.slice(2).map((post) => {
                        const category = post.data
                            .category as unknown as BlogCategoryDocument;

                        return (
                            <EachSmallBlog
                                key={post.id}
                                date={post.first_publication_date}
                                category={category.data.title as string}
                                img={post?.data.featured_image.url as string}
                                title={post?.data?.title as string}
                                link={`/blog/${category.uid}/${post.uid}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div className='flex justify-between items-center container mt-12 mx-auto px-5'>
                <div className='flex items-center gap-2 text-[12px]'>
                    <span className='text-c1c'>Page</span>
                    <div className='flex gap-2 items-center'>
                        <Link href={"#"} className='text-c2a'>
                            1
                        </Link>
                        <Link href={"#"}>2</Link>
                        <Link href={"#"}>3</Link>
                        <Link href={"#"}>4</Link>
                    </div>
                </div>

                <Button
                    endIcon={<KeyboardArrowRight />}
                    className='bg-c2a font-bold text-[15px] w-fit
                 capitalize border-c2b border-[2px]
                 font-poppins hover:bg-c2a hidden sm:flex text-white'
                >
                    Next Page
                </Button>

                <div className='flex items-center gap-2 text-[12px]'>
                    <span
                        className='px-2 bg-c2e
                     rounded-full text-c2a font-bold font-poppins'
                    >
                        198
                    </span>
                    <span className='text-c1c'>articles</span>
                </div>
            </div>
        </>
    );
};

export default index;
