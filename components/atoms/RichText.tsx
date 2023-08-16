import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";

interface Props {
    field: RichTextField | null | undefined;
}
const RichText = ({ field }: Props) => {
    return (
        <PrismicRichText
            field={field}
            components={{
                paragraph: ({ children }) => (
                    <p className='text-[14px] mb-6'>{children}</p>
                ),
                heading2: ({ children }) => (
                    <h2 className='font-poppins font-semibold text-[18px] mt-8'>
                        {children}
                    </h2>
                ),
                heading3: ({ children }) => (
                    <h3 className='font-poppins font-semibold text-[17px]'>
                        {children}
                    </h3>
                ),
                heading4: ({ children }) => (
                    <h3 className='font-poppins font-semibold text-[16px]'>
                        {children}
                    </h3>
                ),
                heading5: ({ children }) => (
                    <h3 className='font-poppins font-semibold text-[15px]'>
                        {children}
                    </h3>
                ),
                heading6: ({ children }) => (
                    <h3 className='font-poppins font-semibold text-[14px]'>
                        {children}
                    </h3>
                ),
                oListItem: ({ children }) => (
                    <li
                        style={{ listStyleType: "decimal" }}
                        className='list-decimal'
                    >
                        {children}
                    </li>
                ),
                listItem: ({ children }) => (
                    <li style={{ listStyleType: "disc" }} className='list-disc'>
                        {children}
                    </li>
                ),
            }}
        />
    );
};

export default RichText;
