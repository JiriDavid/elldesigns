import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";

function isAdmin(userId) {
  return userId && userId === process.env.ADMIN_CLERK_USER_ID;
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!isAdmin(userId)) {
      return new Response(JSON.stringify({ error: "Unauthorized." }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    const formatted = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      productId: order.productId?.toString?.() || null,
      createdAt: order.createdAt?.toISOString?.() || null,
      updatedAt: order.updatedAt?.toISOString?.() || null,
    }));

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error) {
    console.error("Orders GET error:", error);
    return new Response(JSON.stringify({ error: "Unable to fetch orders." }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { userId } = auth();
    const {
      productId,
      quantity = 1,
      size,
      color,
      notes,
    } = await request.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product is required." }), {
        status: 400,
      });
    }

    await connectToDatabase();
    await Order.create({
      productId,
      quantity: Number(quantity) || 1,
      size,
      color,
      notes,
      userId,
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("Order POST error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to submit order request." }),
      { status: 500 }
    );
  }
}
