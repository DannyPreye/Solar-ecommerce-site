"use client";
import RichText from "@/components/atoms/RichText";
import { ProductDocument } from "@/prismicio-types";
import { Add, FavoriteBorder, PlusOne } from "@mui/icons-material";
import { Button, Rating, Tab, Tabs, Typography } from "@mui/material";
import { RichTextField } from "@prismicio/client";
import Image from "next/image";
import React, { FC, useState } from "react";

interface Props {
    productDetail: ProductDocument<string>;
}

const ProductDetails = ({ productDetail }: Props) => {
    console.log(productDetail);
    return (
        <main className='px-5'>
            <div className='container mx-auto mt-12 gap-8 flex lg:flex-nowrap flex-wrap '>
                <ImagesSection
                    productTitle='Solar Inverter'
                    images={productDetail.data.images.map(
                        (item) => item.image.url as string
                    )}
                />
                <section>
                    <div className='flex flex-col gap-[8px]'>
                        <h1 className='text-[32px] font-semibold font-poppins'>
                            {productDetail.data.name}
                        </h1>
                        <div className='flex gap-2'>
                            <Rating
                                name='product-rating'
                                value={4}
                                size='small'
                                readOnly
                            />
                            <p className='text-c1c text-[12px]'>
                                (1 customer review)
                            </p>
                        </div>
                    </div>

                    <div className='mt-[40px]'>
                        <p className='text-[17px] font-open-sans'>
                            {productDetail.data.short_description}
                        </p>
                    </div>

                    <div className='my-[40px] grid grid-cols-2 gap-3 md:gap-[32px]'>
                        {productDetail.data.slices.map((slice) => {
                            switch (slice.slice_type) {
                                case "product_properties":
                                    return (
                                        <>
                                            {slice.items.map((item, id) => (
                                                <ProductProperties
                                                    key={id}
                                                    property={
                                                        item.property as string
                                                    }
                                                    value={item.value as string}
                                                />
                                            ))}
                                        </>
                                    );
                            }
                        })}
                    </div>

                    <ProductPrice
                        price={productDetail.data.price as number}
                        previousPrice={
                            productDetail.data.price_before_discount as number
                        }
                    />

                    <div className=''>
                        <Button
                            className='text-c1a capitalize rounded-full font-semibold'
                            startIcon={<FavoriteBorder className='text-c4a' />}
                        >
                            Add to wish list
                        </Button>
                    </div>

                    <ProductDescription
                        productDesc={productDetail.data.long_description}
                    />
                </section>
            </div>
        </main>
    );
};

interface ImagesProps {
    images: string[];
    productTitle: string;
}

const ImagesSection: FC<ImagesProps> = ({ images, productTitle }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [bigImage, setBigImage] = useState(images[0]);
    return (
        <section className='flex flex-col gap-4 w-full max-w-[569px]'>
            <div
                className=' h-[436px] bg-c1h
                    relative rounded-[12px]'
            >
                <Image
                    src={bigImage}
                    alt={""}
                    fill
                    className='object-contain'
                />
            </div>
            <div className='flex gap-3 items-start flex-wrap mt-5'>
                {images.map((image, id) => (
                    <div
                        onClick={() => {
                            setCurrentImage(id);
                            setBigImage(image);
                        }}
                        key={id}
                        className={`w-[25%] relative cursor-pointer hover:border-black
                        hover:scale-105 duration-500 h-[78px]
                        md:h-[110px] rounded-md border-2 ${
                            currentImage == id && "scale-[1.10] border-black"
                        }`}
                    >
                        <Image
                            src={image}
                            alt={""}
                            fill
                            className='object-contain'
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

interface ProductPropertiesProps {
    property: string;
    value: string;
}
const ProductProperties = ({ property, value }: ProductPropertiesProps) => {
    return (
        <div className='grid grid-cols-2 gap-[40px]'>
            <p className='text-c1c'>{property}</p>
            <p>{value}</p>
        </div>
    );
};

interface ProductPriceProps {
    price: string | number;
    previousPrice: string | number;
}
const ProductPrice = ({ price, previousPrice }: ProductPriceProps) => {
    return (
        <div
            className='border-[1px] rounded-[12px]
         p-[16px] mb-[24px] flex justify-between items-center'
        >
            <div>
                <h3 className='text-c2a font-semibold text-[26px] '>{price}</h3>
                <h5 className='text-c1c text-[12px] font-semibold line-through'>
                    {previousPrice}
                </h5>
            </div>
            <div className='flex items-center gap-[24px]'>
                <Button
                    startIcon={<Add />}
                    className='bg-c2a rounded-full px-2 text-c1f font-semibold capitalize'
                >
                    Add to cart
                </Button>
            </div>
        </div>
    );
};
export default ProductDetails;

interface ProductDescriptionProps {
    productDesc: RichTextField | null | undefined;
}
const ProductDescription = ({ productDesc }: ProductDescriptionProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className='my-[40px]'>
            <div className='border-b-[1px] '>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    aria-label='basic tabs example'
                >
                    <Tab
                        className='capitalize font-semibold '
                        label='Description'
                        {...a11yProps(0)}
                    />
                    <Tab
                        className='capitalize font-semibold '
                        label='Reviews'
                        {...a11yProps(1)}
                    />
                    {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                <RichText field={productDesc} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus, odit quia! Quo, id! Magni, ab minus est, quis
                fugiat architecto quidem error nemo perspiciatis ex pariatur non
                quae explicabo sed.
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </div>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className='p-3'>
                    <div>{children}</div>
                </div>
            )}
        </div>
    );
}
