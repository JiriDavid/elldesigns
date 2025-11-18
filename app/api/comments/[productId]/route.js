import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";

export async function POST(request, { params }) {
  try {
    const { userId, sessionClaims } = auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Authentication required." }),
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content) {
      return new Response(JSON.stringify({ error: "Content is required." }), {
        status: 400,
      });
    }

    await connectToDatabase();
    const comment = await Comment.create({
      productId: params.productId,
      userId,
      authorName: sessionClaims?.fullName || sessionClaims?.name,
      content,
    });

    return new Response(
      JSON.stringify({
        _id: comment._id.toString(),
        productId: comment.productId.toString(),
        userId: comment.userId,
        authorName: comment.authorName,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment POST error:", error);
    return new Response(JSON.stringify({ error: "Unable to add comment." }), {
      status: 500,
    });
  }
}
