import ProductsGrid from "@/components/products/ProductsGrid";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export const metadata = {
  title: "Collections",
  description:
    "Discover bespoke uniforms, suits, blazers, tracksuits, and African couture from EllDesigns.",
};

async function getProducts() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString?.() || null,
  }));
}

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-6 pb-12">
        <span className="text-xs uppercase tracking-[0.4em] text-brandCrimson font-bold">
          Collections
        </span>
        <h1 className="text-4xl font-semibold">
          Curated looks for every moment
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Explore the full range of EllDesigns creations—crafted for schools,
          corporate teams, sports clubs, and bespoke couture enthusiasts.
        </p>
      </div>
      <ProductsGrid products={products} />
    </div>
  );
}
