import Details from "@/components/pages/Blog/Details";
import { createClient } from "@/prismicio";
import { getBlogDetail } from "@/utils/queryHelper";

import React from "react";

const page = async ({ params }: { params: any }) => {
    const { slug } = params;

    const client = createClient();

    const details = await getBlogDetail(client, slug[slug.length - 1]);

    return <Details blogDetail={details} />;
};

export default page;
