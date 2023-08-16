import { createClient } from "@/prismicio";
import { getBlogPosts } from "@/utils/queryHelper";
import React from "react";
import Blog from "@/components/pages/Blog"

const page = async () =>
{
    const client = createClient()
    const { blogPosts } = await getBlogPosts(client);

    return <Blog posts={blogPosts} />;
};

export default page;
