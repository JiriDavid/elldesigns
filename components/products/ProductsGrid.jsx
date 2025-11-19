"use client";

import ProductCard from "./ProductCard";

export default function ProductsGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-white/95 p-12 text-center text-slate-600 shadow-lg">
        No products found. Please check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
