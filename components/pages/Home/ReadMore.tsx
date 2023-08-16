import SectionHeading from "@/components/atoms/Section";
import { BlogCategoryDocument, BlogDocument } from "@/prismicio-types";
import React from "react";
import EachBlogPost, { EachBlogProps } from "../Blog/EachBlogPost";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { UnknownErrorParams } from "@prisma/client/runtime/library";
import EachSmallBlog from "../Blog/EachSmallBlogPost";

interface Props {
    blogPosts: BlogDocument<string>[];
}
const ReadMore = ({ blogPosts }: Props) => {
    const firstCategory = blogPosts[0].data
        .category as unknown as BlogCategoryDocument;
    const secondCategory = blogPosts[0].data
        .category as unknown as BlogCategoryDocument;
    return (
        <section className='px-5'>
            <div className='container mx-auto'>
                <SectionHeading
                    buttonLink='/blog'
                    sectionHeadline='Latest Blog Posts'
                    buttonTitle='See More'
                />
                <div className='mt-5 gap-5 lg:gap-0 flex justify-center  md:justify-between flex-wrap w-full'>
                    <EachBlogPost
                        category={firstCategory?.data?.title as string}
                        title={blogPosts[0].data?.title as string}
                        image={blogPosts[0].data?.featured_image.url as string}
                        date={blogPosts[0].first_publication_date}
                        alt={
                            (blogPosts[0]?.data?.featured_image
                                .alt as string) ||
                            (blogPosts[0]?.data?.title as string)
                        }
                        link={`/blog/${firstCategory?.uid}/${blogPosts[0]?.uid}`}
                    />
                    <EachSmallBlog
                        date={blogPosts[1].first_publication_date}
                        category={secondCategory.data.title as string}
                        img={blogPosts[1]?.data.featured_image.url as string}
                        title={blogPosts[1]?.data?.title as string}
                        link={`/blog/${secondCategory.uid}/${blogPosts[1].uid}`}
                    />

                    <div className='gap-3 grid'>
                        {blogPosts.slice(2).map((post) => {
                            const category = post.data
                                .category as unknown as BlogCategoryDocument;

                            return (
                                <HorizontalPost
                                    alt={
                                        post?.data.featured_image.alt as string
                                    }
                                    key={post.id}
                                    date={post.first_publication_date}
                                    category={category.data.title as string}
                                    image={
                                        post?.data.featured_image.url as string
                                    }
                                    title={post?.data?.title as string}
                                    link={`/blog/${category.uid}/${post.uid}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReadMore;

const HorizontalPost = ({
    link,
    image,
    alt,
    title,
    date,
    category,
}: EachBlogProps) => {
    return (
        <Link
            className='h-[96px] items-center flex w-full max-w-[369px] gap-3 '
            href={link || "#"}
        >
            <div className='flex flex-col gap-4 items-center'>
                <p
                    className='font-poppins flex flex-col
                items-center text-[15px] text-c1a font-medium'
                >
                    {title}
                </p>
                <div className='gap-3 flex w-full items-center '>
                    <span
                        className='text-c2a text-[9px] lg:text-[12px] bg-c1e px-2
                     rounded-full capitalize font-semibold font-poppins'
                    >
                        {category}
                    </span>
                    <span className='text-[12px] text-c1c'>
                        {moment(date).format("DD MMMM, YYYY")}
                    </span>
                </div>
            </div>
            <div className='h-full w-[96px] flex-shrink-0 relative rounded-[12px] bg-c1f'>
                <Image
                    fill
                    src={image}
                    alt={alt || title}
                    className='object-contain'
                />
            </div>
        </Link>
    );
};
