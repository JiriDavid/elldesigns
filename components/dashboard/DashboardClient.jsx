"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { FaPlus, FaRegTrashAlt, FaSyncAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const uploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "elldesigns_unsigned";
const productStatuses = ["new", "in-progress", "completed"];
const tabs = [
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "messages", label: "Messages" },
];

export default function DashboardClient({
  initialProducts,
  initialOrders,
  initialMessages,
}) {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [orderLoadingId, setOrderLoadingId] = useState("");
  const [messageLoadingId, setMessageLoadingId] = useState("");

  const sortedProducts = useMemo(
    () =>
      [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    [products]
  );

  const handleCreateOrUpdateProduct = async (payload, isEdit) => {
    try {
      setProductLoading(true);
      const endpoint = isEdit
        ? `/api/products/${selectedProduct._id}`
        : "/api/products";
      const method = isEdit ? "PATCH" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to save product");
      }

      const data = await response.json();
      if (isEdit) {
        setProducts((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
        setSelectedProduct(null);
      } else {
        setProducts((prev) => [data, ...prev]);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Remove this product from the catalogue?")) return;
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to delete product");
      }
      setProducts((prev) => prev.filter((item) => item._id !== productId));
      if (selectedProduct?._id === productId) {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      setOrderLoadingId(orderId);
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to update order");
      }
      const data = await response.json();
      setOrders((prev) =>
        prev.map((item) => (item._id === orderId ? data : item))
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setOrderLoadingId("");
    }
  };

  const handleOrderDelete = async (orderId) => {
    if (!window.confirm("Delete this order request?")) return;
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to delete order");
      }
      setOrders((prev) => prev.filter((item) => item._id !== orderId));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleMessageDelete = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      setMessageLoadingId(messageId);
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to delete message");
      }
      setMessages((prev) => prev.filter((item) => item._id !== messageId));
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setMessageLoadingId("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition ${
              activeTab === tab.id
                ? "border-brandCrimson bg-brandSoftPink/20 text-brandCrimson"
                : "border-rose-100 bg-white text-slate-500 hover:border-brandPink/60 hover:text-brandCrimson"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]"
          >
            <ProductEditor
              key={selectedProduct?._id || "new"}
              initialProduct={selectedProduct}
              loading={productLoading}
              onCancel={() => setSelectedProduct(null)}
              onSubmit={(payload) =>
                handleCreateOrUpdateProduct(payload, Boolean(selectedProduct))
              }
            />
            <div className="space-y-4">
              {sortedProducts.length === 0 ? (
                <p className="rounded-3xl border border-rose-100 bg-white p-8 text-sm text-slate-500 shadow-sm">
                  No products yet. Upload your first collection masterpiece.
                </p>
              ) : (
                <ul className="space-y-4">
                  {sortedProducts.map((product) => (
                    <li
                      key={product._id}
                      className="rounded-3xl border border-rose-100 bg-white/95 p-6 shadow-lg"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-base font-semibold text-[#1f151d]">
                            {product.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            {product.category}
                          </p>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="rounded-full border border-rose-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brandCrimson transition hover:border-brandPink/60"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex items-center gap-2 rounded-full border border-brandCrimson/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brandCrimson transition hover:border-brandCrimson hover:bg-brandCrimson hover:text-white"
                          >
                            <FaRegTrashAlt /> Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "orders" && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {orders.length === 0 ? (
              <p className="rounded-3xl border border-rose-100 bg-white p-8 text-sm text-slate-500 shadow-sm">
                No order requests yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="rounded-3xl border border-rose-100 bg-white/95 p-6 shadow-lg"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-[#1f151d]">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </p>
                        <p>Product ID: {order.productId}</p>
                        <p>Customer ID: {order.userId || "Guest"}</p>
                        <p>Size: {order.size || "—"}</p>
                        <p>Palette: {order.color || "—"}</p>
                        <p>Notes: {order.notes || "—"}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          {new Date(order.createdAt).toLocaleString("en-ZW")}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <select
                          className="rounded-full border border-rose-100 bg-white px-4 py-2 text-sm text-[#1f151d] focus:border-brandPink focus:outline-none"
                          value={order.status}
                          onChange={(event) =>
                            handleOrderStatusChange(
                              order._id,
                              event.target.value
                            )
                          }
                          disabled={orderLoadingId === order._id}
                        >
                          {productStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status.replace("-", " ")}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => handleOrderDelete(order._id)}
                          className="flex items-center justify-center gap-2 rounded-full border border-brandCrimson/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brandCrimson transition hover:bg-brandCrimson hover:text-white"
                          disabled={orderLoadingId === order._id}
                        >
                          <FaRegTrashAlt /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {activeTab === "messages" && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {messages.length === 0 ? (
              <p className="rounded-3xl border border-rose-100 bg-white p-8 text-sm text-slate-500 shadow-sm">
                No new messages yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <li
                    key={message._id}
                    className="rounded-3xl border border-rose-100 bg-white/95 p-6 shadow-lg"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                      <div>
                        <p className="text-base font-semibold text-[#1f151d]">
                          {message.name}
                        </p>
                        <p className="text-sm text-brandCrimson">
                          {message.email}
                        </p>
                        <p className="mt-3 text-sm text-slate-600 whitespace-pre-line">
                          {message.message}
                        </p>
                        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                          {new Date(message.createdAt).toLocaleString("en-ZW")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMessageDelete(message._id)}
                        className="flex h-fit items-center gap-2 rounded-full border border-brandCrimson/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brandCrimson transition hover:bg-brandCrimson hover:text-white"
                        disabled={messageLoadingId === message._id}
                      >
                        {messageLoadingId === message._id ? (
                          <FaSyncAlt className="animate-spin" />
                        ) : (
                          <FaRegTrashAlt />
                        )}{" "}
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductEditor({ initialProduct, loading, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => ({
    name: initialProduct?.name || "",
    category: initialProduct?.category || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || "",
    sizes: initialProduct?.sizes?.join(", ") || "",
    media: initialProduct?.media || [],
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: form.price ? Number(form.price) : undefined,
      sizes: form.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean),
      media: form.media,
    };

    if (!payload.name || !payload.category || !payload.description) {
      alert("Please complete the required fields.");
      return;
    }

    await onSubmit(payload);
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      sizes: "",
      media: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brandCrimson">
          {initialProduct ? "Edit couture piece" : "Add new couture piece"}
        </h2>
        {initialProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs uppercase tracking-[0.3em] text-slate-400 transition hover:text-brandCrimson"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid gap-4">
        <label className="space-y-2 text-sm text-slate-600">
          Title
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
            placeholder="Example: Crimson Crest Blazer"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
            placeholder="Blazers, Tracksuits, African Attire..."
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-3xl border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
            placeholder="Share the story, fabric, and finish"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Price (USD)
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
            placeholder="Optional"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Sizes (comma separated)
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] placeholder-slate-400 focus:border-brandPink focus:ring-brandPink/30"
            placeholder="XS, S, M, L, XL"
          />
        </label>

        <div className="space-y-2 text-sm text-slate-600">
          Media gallery
          <div className="flex flex-wrap items-center gap-3">
            <CldUploadWidget
              signatureEndpoint="/api/cloudinary/signature"
              uploadPreset={uploadPreset}
              options={{
                multiple: true,
                maxFiles: 8,
                sources: ["local", "camera"],
              }}
              onUpload={(result) => {
                const secureUrl = result.info?.secure_url;
                if (secureUrl) {
                  setForm((prev) => ({
                    ...prev,
                    media: [...prev.media, secureUrl],
                  }));
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="flex items-center gap-2 rounded-full bg-brandCrimson px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-neon transition hover:bg-brandPink"
                >
                  <FaPlus /> Upload
                </button>
              )}
            </CldUploadWidget>
            {form.media.length > 0 && (
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, media: [] }))}
                className="rounded-full border border-rose-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500 transition hover:border-brandPink/60 hover:text-brandCrimson"
              >
                Clear gallery
              </button>
            )}
          </div>
          {form.media.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {form.media.map((url, index) => (
                <div
                  key={url}
                  className="relative h-24 overflow-hidden rounded-2xl border border-rose-100"
                >
                  <Image
                    src={url}
                    alt={`Media ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        media: prev.media.filter((item) => item !== url),
                      }))
                    }
                    className="absolute right-2 top-2 rounded-full bg-brandCrimson px-2 py-1 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-neon transition hover:bg-brandPink disabled:opacity-60"
      >
        {loading
          ? "Saving..."
          : initialProduct
          ? "Update product"
          : "Create product"}
      </button>
    </form>
  );
}
