"use client";

import { useMemo, useState } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaWhatsapp } from "react-icons/fa";

const initialOrderState = {
  quantity: 1,
  size: "",
  color: "",
  notes: "",
};

export default function ProductDetail({ product, initialComments }) {
  const media = product.media?.length
    ? product.media
    : ["/images/placeholders/product-placeholder.svg"];
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [comments, setComments] = useState(initialComments || []);
  const [commentValue, setCommentValue] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [orderState, setOrderState] = useState({ ...initialOrderState });
  const [orderStatus, setOrderStatus] = useState({ type: "", message: "" });
  const [orderLoading, setOrderLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const displayPrice = useMemo(() => {
    if (!product.price) return "Custom Quote";
    return `$${Number(product.price).toLocaleString()}`;
  }, [product.price]);

  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update wishlist");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!commentValue.trim()) return;

    try {
      setCommentLoading(true);
      const response = await fetch(`/api/comments/${product._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentValue }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add comment");
      }

      const newComment = await response.json();
      setComments((prev) => [newComment, ...prev]);
      setCommentValue("");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleOrderChange = (event) => {
    const { name, value } = event.target;
    setOrderState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      setOrderLoading(true);
      setOrderStatus({ type: "", message: "" });

      const payload = {
        ...orderState,
        quantity: Number(orderState.quantity) || 1,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, ...payload }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Unable to place order request");
      }

      setOrderStatus({
        type: "success",
        message: "Order request submitted. We will contact you shortly.",
      });
      setOrderState({ ...initialOrderState });
    } catch (error) {
      setOrderStatus({ type: "error", message: error.message });
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-rose-100 shadow-lg">
          <Image
            src={media[selectedMedia]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {media.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setSelectedMedia(index)}
              className={`relative h-24 w-24 overflow-hidden rounded-2xl border transition ${
                selectedMedia === index
                  ? "border-brandCrimson"
                  : "border-rose-100 hover:border-brandPink/60"
              }`}
            >
              <Image
                src={url}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-brandCrimson">
            Why clients love this piece
          </h2>
          <p className="mt-4 text-sm text-slate-600">{product.description}</p>
          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brandPink">
                Category
              </p>
              <p className="mt-2 text-base text-[#1f151d]">
                {product.category}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brandPink">
                Investment
              </p>
              <p className="mt-2 text-base text-[#1f151d]">{displayPrice}</p>
            </div>
            {product.sizes?.length ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brandPink">
                  Available sizes
                </p>
                <p className="mt-2 text-base text-[#1f151d]">
                  {product.sizes.join(", ")}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#1f151d]">
                {product.name}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.4em] text-slate-500">
                {product.category}
              </p>
            </div>
            <SignedIn>
              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="flex items-center gap-2 rounded-full border border-rose-100 px-4 py-2 text-sm font-semibold text-brandCrimson transition hover:border-brandPink/60"
              >
                <FaHeart className="text-brandSoftPink" />{" "}
                {wishlistLoading ? "Adding…" : "Wishlist"}
              </button>
            </SignedIn>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            To customise this piece, chat with us on WhatsApp or complete the
            order request form. Our atelier will tailor the garment to your
            measurements and aesthetic.
          </p>
          <a
            href={`https://wa.me/263771234567?text=Hi%20EllDesigns!%20I%27d%20love%20to%20order%20the%20${encodeURIComponent(
              product.name
            )}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-neon transition hover:bg-brandPink"
          >
            <FaWhatsapp /> WhatsApp Atelier
          </a>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
          <h3 className="text-lg font-semibold text-brandCrimson">
            Request a bespoke order
          </h3>
          <form className="mt-6 space-y-4" onSubmit={handleOrderSubmit}>
            <div>
              <label
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={orderState.quantity}
                onChange={handleOrderChange}
                className="mt-2 w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
              />
            </div>
            <div>
              <label
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
                htmlFor="size"
              >
                Preferred size
              </label>
              <input
                id="size"
                name="size"
                value={orderState.size}
                onChange={handleOrderChange}
                className="mt-2 w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
                placeholder="Example: Medium / 34"
              />
            </div>
            <div>
              <label
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
                htmlFor="color"
              >
                Preferred palette
              </label>
              <input
                id="color"
                name="color"
                value={orderState.color}
                onChange={handleOrderChange}
                className="mt-2 w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
                placeholder="Share colour inspirations"
              />
            </div>
            <div>
              <label
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
                htmlFor="notes"
              >
                Additional notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={orderState.notes}
                onChange={handleOrderChange}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
                placeholder="Measurements, deadlines, or styling cues"
              />
            </div>
            {orderStatus.message ? (
              <p
                className={`text-sm ${
                  orderStatus.type === "success"
                    ? "text-emerald-600"
                    : "text-brandCrimson"
                }`}
              >
                {orderStatus.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={orderLoading}
              className="w-full rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-neon transition hover:bg-brandPink disabled:opacity-60"
            >
              {orderLoading ? "Sending..." : "Submit order request"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brandCrimson">
              Community impressions
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {comments.length} entries
            </span>
          </div>

          <SignedOut>
            <p className="mt-4 text-sm text-slate-600">
              Sign in to leave a comment or add this masterpiece to your
              wishlist.
            </p>
          </SignedOut>

          <SignedIn>
            <form className="mt-6 space-y-4" onSubmit={handleCommentSubmit}>
              <textarea
                value={commentValue}
                onChange={(event) => setCommentValue(event.target.value)}
                rows={3}
                placeholder="Share your thoughts on this creation..."
                className="w-full resize-none rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
              />
              <button
                type="submit"
                disabled={commentLoading}
                className="rounded-full bg-brandCrimson px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-brandPink disabled:opacity-70"
              >
                {commentLoading ? "Posting..." : "Share comment"}
              </button>
            </form>
          </SignedIn>

          <ul className="mt-6 space-y-6 text-sm text-slate-600">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-brandCrimson">
                  {comment.authorName || "EllDesigns patron"}
                </p>
                <p className="mt-2 text-slate-600">{comment.content}</p>
                <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString("en-ZW", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </li>
            ))}
            {!comments.length && (
              <li className="rounded-2xl border border-rose-100 bg-white p-4 text-slate-500">
                Be the first to celebrate this design with a comment.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
