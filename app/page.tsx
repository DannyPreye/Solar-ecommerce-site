import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import HeroSlider from "@/components/pages/Home/HeroSlider";
import { createClient } from "@/prismicio";
import {
    getBestSelling,
    getBlogPosts,
    getMainCategories,
    getNewProducts,
} from "@/utils/queryHelper";
import BestSelling from "@/components/pages/Home/BestSelling";
import NewProducts from "@/components/pages/Home/NewProducts";
import ReadMore from "@/components/pages/Home/ReadMore";

export default async function Home() {
    const client = createClient();
    const categories = await getMainCategories(client);
    const { products } = await getBestSelling(client);
    const { products: newProducts } = await getNewProducts(client);
    const { blogPosts } = await getBlogPosts(client);

    return (
        <main>
            <HeroSlider />
            <BestSelling categories={categories} products={products} />
            <NewProducts products={newProducts} />
            <ReadMore blogPosts={blogPosts} />
        </main>
    );
}
