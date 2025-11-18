import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

function isAdmin(userId) {
  return userId && userId === process.env.ADMIN_CLERK_USER_ID;
}

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    const formatted = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toISOString?.() || null,
      updatedAt: product.updatedAt?.toISOString?.() || null,
    }));
    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error) {
    console.error("Products GET error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to fetch products." }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!isAdmin(userId)) {
      return new Response(JSON.stringify({ error: "Unauthorized." }), {
        status: 403,
      });
    }

    const body = await request.json();
    if (!body.name || !body.category || !body.description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }
    await connectToDatabase();
    const product = await Product.create(body);

    return new Response(
      JSON.stringify({
        ...product.toObject(),
        _id: product._id.toString(),
        createdAt: product.createdAt.toISOString(),
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Products POST error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to create product." }),
      { status: 500 }
    );
  }
}
