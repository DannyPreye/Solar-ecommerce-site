import Product from "@/components/atoms/Product";
import SectionHeading from "@/components/atoms/Section";
import { ProductDocument } from "@/prismicio-types";
import React from "react";

interface Props {
    products: ProductDocument<string>[];
}
const NewProducts = ({ products }: Props) => {
    return (
        <section className=' px-5'>
            <div className=' container mt-12'>
                <SectionHeading
                    buttonLink=''
                    sectionHeadline='New Arrivals'
                    buttonTitle='See More'
                />
                <div className='flex flex-wrap justify-center lg:justify-start items-stretch gap-5 mt-5 pb-7'>
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
        </section>
    );
};

export default NewProducts;
