import { navLinks } from "@/utils/contants";
import Link from "next/link";
import React from "react";

const footerItems = [
    {
        title: "Get in touch",
        items: [...navLinks],
    },
    {
        title: "Earnings",
        items: [
            {
                title: "Become an Installer",
                link: "#",
            },
            {
                title: "Advertise your products",
                link: "#",
            },
            {
                title: "Become a seller",
                link: "#",
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "Your account",
                link: "#",
            },
            {
                title: "Chat with us",
                link: "#",
            },
            {
                title: "Help",
                link: "#",
            },
        ],
    },
];

const index = () => {
    return (
        <footer className=' pt-5 mt-12 bg-c1a '>
            <div className='px-5'>
                <div className=' container mx-auto '>
                    <div className='lg:flex-row  flex-col gap-5 lg:gap-0 flex justify-between items-center md:items-start flex-wrap'>
                        {footerItems.map((footerItem, id) => (
                            <EachFooterItem
                                key={`footer_item_${id}`}
                                title={footerItem.title}
                                items={footerItem.items}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-8 bg py-4 bg-c2b'>
                <p className='text-white font-open-sans text-center font-semibold  text-[12px]'>
                    Copyright &#169; {new Date().getFullYear()} Digital Gadget{" "}
                </p>
            </div>
        </footer>
    );
};

export default index;

interface Props {
    title: string;
    items: {
        title?: string;
        link: string;
        name?: string;
    }[];
}
const EachFooterItem = ({ title, items }: Props) => {
    return (
        <div>
            <h4 className='font-semibold text-[18px] text-center md:text-left text-c1f '>
                {title}
            </h4>
            <div className='flex flex-col items-center md:items-start gap-[16px] mt-[16px] '>
                {items.map((item) => (
                    <Link
                        className='text-c2a text-[14px]'
                        key={item.title}
                        href={item.link || "#"}
                    >
                        {item.title || item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
