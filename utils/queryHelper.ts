import { AllDocumentTypes, ProductCategoryDocument } from "@/prismicio-types";
import { Client } from "@prismicio/client";
import * as prismic from "@prismicio/client";

export const getMainCategories = async (client: Client<AllDocumentTypes>) =>
{
    const categories = await client.getByType("product_category", {
        graphQuery: `{
            product_category{
                title
            }
        }`
    });

    return categories.results;

};

export const getCategoriesAndSub = async (client: Client<AllDocumentTypes>) =>
{
    const categories = await client.getByType("product_category", {
        fetchLinks: [ "product_category.title" ],
        filters: [
            prismic.filter.at("my.product_category.main_category", true)
        ]
    });

    return categories.results;

};


export const getNewProducts = async (client: Client<AllDocumentTypes>, pageSize?: number) =>
{
    const products = await client.getByType("product", {
        pageSize: pageSize || 6,
        filters: [
            prismic.filter.at("my.product.best_selling", false)
        ],
        graphQuery: `{
            product{
                name
                featured_image
                price
                price_before_discount
                category{
                    title
                }
            }
        }`,
        orderings: {
            field: "document.first_publication_date",
            direction: "desc",
        },
    });

    return { products: products.results, totalPages: products.total_pages };
};

export const getBestSelling = async (client: Client<AllDocumentTypes>, pageSize?: number) =>
{
    const products = await client.getByType("product", {
        filters: [
            prismic.filter.at("my.product.best_selling", true)
        ],
        pageSize: pageSize || 6,
        graphQuery: `{
            product{
                name
                featured_image
                price
                price_before_discount
                category{
                    title
                }
            }
        }`,
        orderings: {
            field: "document.first_publication_date",
            direction: "desc",
        },

    });

    return { products: products.results, totalPages: products.total_pages };
};

export const getBlogPosts = async (client: Client<AllDocumentTypes>, pageSize?: number) =>
{
    const blogCategories = await client.getByType("blog_category");

    const blogPost = await client.getByType("blog", {
        orderings: {
            field: "document.first_publication_date",
            direction: "desc",
        },
        pageSize: pageSize || 5,
        fetchLinks: [ "blog_category.title" ],
        graphQuery: `{
            blog{
                title
                featured_image
                category
                short_description
            }
        }`
    });

    return {
        categories: blogCategories.results,
        blogPosts: blogPost.results,
        totalPages: blogPost.total_pages
    };
};


export const getProductDetails = async (client: Client<AllDocumentTypes>, slug: any) =>
{
    const productDetail = await client.getByUID("product", slug);

    return productDetail;
};


export const getBlogDetail = async (client: Client<AllDocumentTypes>, slug: string) =>
{
    const blogDetail = await client.getByUID("blog", slug);

    return blogDetail;
};


export const getProductCategory = async (client: Client<AllDocumentTypes>, categorySlug: string, pageSize?: number, currentPage?: number) =>
{
    const category = await client.getByUID("product_category", categorySlug,);

    const categoryId = category.id;

    const subCategories = category.data.sub_category.map((cat) =>
    {
        const item = cat.category as unknown as ProductCategoryDocument
        return item.id
    })

    const categories = [...subCategories,categoryId]
    console.log("Sub-category", categories)


    const products = await client.getByType("product", {
        filters: [ prismic.filter.any("my.product.category", categories) ],
        pageSize: pageSize || 9,
        orderings: {
            field: "document.first_publication_date",
            direction: "desc",
        }

    });


    return {
        totalPages: products.total_pages,
        products: products.results,
    };
};
