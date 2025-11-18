import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Message from "@/models/Message";

export const metadata = {
  title: "Admin Dashboard",
};

async function fetchDashboardData() {
  await connectToDatabase();
  const [products, orders, messages] = await Promise.all([
    Product.find({}).sort({ createdAt: -1 }).lean(),
    Order.find({}).sort({ createdAt: -1 }).lean(),
    Message.find({}).sort({ createdAt: -1 }).lean(),
  ]);

  return {
    products: products.map((product) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toISOString?.() || null,
      updatedAt: product.updatedAt?.toISOString?.() || null,
    })),
    orders: orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      productId: order.productId?.toString?.() || null,
      createdAt: order.createdAt?.toISOString?.() || null,
      updatedAt: order.updatedAt?.toISOString?.() || null,
    })),
    messages: messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      createdAt: message.createdAt?.toISOString?.() || null,
    })),
  };
}

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId || userId !== process.env.ADMIN_CLERK_USER_ID) {
    redirect("/");
  }

  const data = await fetchDashboardData();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-6 pt-10">
        <span className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
          Admin Atelier
        </span>
        <h1 className="text-4xl font-semibold">EllDesigns control studio</h1>
        <p className="max-w-2xl text-sm text-white/70">
          Manage collections, respond to couture enquiries, and track bespoke
          orders from the EllDesigns command centre.
        </p>
      </div>
      <div className="mt-12">
        <DashboardClient
          initialProducts={data.products}
          initialOrders={data.orders}
          initialMessages={data.messages}
        />
      </div>
    </div>
  );
}
