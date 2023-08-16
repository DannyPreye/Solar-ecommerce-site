import ProductDetails from "@/components/pages/Product/ProductDetails";
import { createClient } from "@/prismicio";
import { getProductDetails } from "@/utils/queryHelper";

import React from "react";

const page = async ({ params }: { params: any }) => {
    const { slug } = params;
    const client = createClient();
    const productDetails = await getProductDetails(
        client,
        slug[slug.length - 1]
    );

    return (
        <>
            <ProductDetails productDetail={productDetails} />
        </>
    );
};

export default page;
