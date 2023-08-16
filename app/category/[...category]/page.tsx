import React from "react";
import Category from "@/components/pages/Category";
import { createClient } from "@/prismicio";
import { getProductCategory } from "@/utils/queryHelper";

const page = async ({ params }: { params: any }) => {
    const { category } = params;

    const client = createClient();
    const { products } = await getProductCategory(
        client,
        category[category.length - 1]
    );

    console.log("products", products);
    console.log(category[category.length - 1]);

    return (
        <Category products={products} title={category[category.length - 1]} />
    );
};

export default page;
