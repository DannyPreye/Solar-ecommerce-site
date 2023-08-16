import { ProductCategoryDocument, ProductDocument } from "@/prismicio-types";
import React from "react";
import CategoryLeftSection from "./CategoryLeftSection";
import Product from "@/components/atoms/Product";

interface Props {
    title: string;
    products: ProductDocument[];
}
const index = ({ title, products }: Props) => {
    return (
        <div className='container mx-auto px-5 mt-8'>
            <h1 className='font-semibold text-c1a text-[2rem] capitalize'>
                {title}
            </h1>
            <div className='flex gap-8 mt-12 items-start'>
                <div className='hidden lg:block'>
                    <CategoryLeftSection />
                </div>

                <div
                    className='flex flex-wrap items-center
                 md:items-stretch justify-center gap-8 md:justify-start'
                >
                    {products.map((product) => {
                        const category = product.data
                            .category as unknown as ProductCategoryDocument;
                        return (
                            <Product
                                productLink={`/product/${category.uid}/${product.uid}`}
                                key={product.id}
                                img={product.data.featured_image.url as string}
                                title={product.data.name as string}
                                price={product.data.price as number}
                                oldPrice={
                                    product.data.price_before_discount as number
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default index;
