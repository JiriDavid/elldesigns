import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

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
    const product = await Product.findByIdAndUpdate(params.id, updates, {
      new: true,
    }).lean();

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt?.toISOString?.() || null,
        updatedAt: product.updatedAt?.toISOString?.() || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Product PATCH error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to update product." }),
      { status: 500 }
    );
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
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to delete product." }),
      { status: 500 }
    );
  }
}
