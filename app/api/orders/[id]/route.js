import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";

function isAdmin(userId) {
  return userId && userId === process.env.ADMIN_CLERK_USER_ID;
}

export async function PATCH(request, { params }) {
  try {
    const { userId } = auth();
    if (!isAdmin(userId)) {
      return new Response(JSON.stringify({ error: "Unauthorized." }), {
        status: 403,
      });
    }

    const updates = await request.json();
    await connectToDatabase();
    const order = await Order.findByIdAndUpdate(params.id, updates, {
      new: true,
    }).lean();

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        ...order,
        _id: order._id.toString(),
        productId: order.productId?.toString?.() || null,
        createdAt: order.createdAt?.toISOString?.() || null,
        updatedAt: order.updatedAt?.toISOString?.() || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Order PATCH error:", error);
    return new Response(JSON.stringify({ error: "Unable to update order." }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    if (!isAdmin(userId)) {
      return new Response(JSON.stringify({ error: "Unauthorized." }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const order = await Order.findByIdAndDelete(params.id);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Order DELETE error:", error);
    return new Response(JSON.stringify({ error: "Unable to delete order." }), {
      status: 500,
    });
  }
}
