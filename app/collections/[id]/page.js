import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import Comment from "@/models/Comment";

async function getProduct(id) {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  const comments = await Comment.find({ productId: product._id })
    .sort({ createdAt: -1 })
    .lean();

  return {
    product: {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toISOString?.() || null,
    },
    comments: comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
      productId: comment.productId.toString(),
      createdAt: comment.createdAt?.toISOString?.() || null,
    })),
  };
}

export async function generateMetadata({ params }) {
  const data = await getProduct(params.id);
  if (!data) {
    return {
      title: "Product not found",
      description: "The requested EllDesigns product could not be located.",
    };
  }

  const { product } = data;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.media?.length ? [{ url: product.media[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const data = await getProduct(params.id);

  if (!data) {
    notFound();
  }

  return (
    <ProductDetail product={data.product} initialComments={data.comments} />
  );
}
