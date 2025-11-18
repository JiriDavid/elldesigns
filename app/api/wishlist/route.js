import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Wishlist from "@/models/Wishlist";

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Authentication required." }),
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    if (!productId) {
      return new Response(
        JSON.stringify({ error: "Product ID is required." }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Wishlist.updateOne(
      { userId, productId },
      { $setOnInsert: { userId, productId } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to update wishlist." }),
      { status: 500 }
    );
  }
}
