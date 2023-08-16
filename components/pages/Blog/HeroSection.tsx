import React, { FC } from "react";
import EachBlog from "./EachBlogPost";
import { BlogCategoryDocument, BlogDocument } from "@/prismicio-types";

interface Props {
    blogPosts: BlogDocument<string>[];
}
const HeroSection: FC<Props> = ({ blogPosts }) => {
    return (
        <section className='container px-5 mx-auto mt-8'>
            <div className=''>
                <h1 className='text-[32px] font-semibold text-c1a'>Blog </h1>
            </div>

            <div className='flex justify-center lg:justify-start gap-5 mt-8 flex-wrap'>
                {blogPosts.map((post) => {
                    const category = post.data
                        .category as unknown as BlogCategoryDocument;

                    return (
                        <EachBlog
                            key={post.id}
                            link={`/blog/${category.uid}/${post.uid}`}
                            alt=''
                            date={post.first_publication_date}
                            image={post?.data.featured_image.url as string}
                            title={post?.data?.title as string}
                            category={category.data.title as string}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default HeroSection;
