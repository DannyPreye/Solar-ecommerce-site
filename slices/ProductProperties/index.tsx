import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProductProperties`.
 */
export type ProductPropertiesProps =
  SliceComponentProps<Content.ProductPropertiesSlice>;

/**
 * Component for "ProductProperties" Slices.
 */
const ProductProperties = ({ slice }: ProductPropertiesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for product_properties (variation: {slice.variation}
      ) Slices
    </section>
  );
};

export default ProductProperties;
