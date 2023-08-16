import { ProductCategoryDocument, ProductDocument } from "@/prismicio-types";
import React from "react";
import LeftCategorySection from "./LeftCategorySection";
import Product from "@/components/atoms/Product";

interface Props {
    categories: ProductCategoryDocument<string>[];
    products: ProductDocument<string>[];
}
const BestSelling = ({ categories, products }: Props) => {
    return (
        <section className='px-5 mt-12  py-4'>
            <div className='flex gap-[32px]'>
                <div className='hidden flex-shrink-0 w-[20%]  lg:block'>
                    <LeftCategorySection
                        sectionTitle='Browse Top Categories'
                        categories={categories}
                        addMoreButton
                        linkText='See more'
                        moreCategoryLink='/product/category'
                    />
                </div>

                <div className='flex-1'>
                    <h2 className='lg:hidden block font-bold text-[1.3rem] mb-4'>
                        Browse Top Categories
                    </h2>
                    <div className='  items-stretch justify-center sm:justify-start flex-wrap  flex flex-1 gap-[32px]'>
                        {products.map((product) => (
                            <Product
                                productLink={`/product/${product.uid}`}
                                key={product.id}
                                description={
                                    product.data.short_description as string
                                }
                                price={product.data.price as number}
                                oldPrice={
                                    product.data.price_before_discount as number
                                }
                                img={product.data.featured_image.url as string}
                                title={product.data.name as string}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestSelling;
