"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg"
    >
      <div className="relative h-72 w-full">
        <Image
          src={
            product.media?.[0] || "/images/placeholders/product-placeholder.svg"
          }
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f151d]/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-rose-100 bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brandCrimson">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-[#1f151d]">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm text-slate-600">
          <span>${product.price?.toLocaleString?.() ?? "—"}</span>
          <Link
            href={`/collections/${product._id}`}
            className="rounded-full border border-rose-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brandCrimson transition hover:border-brandPink/60"
          >
            View More
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
