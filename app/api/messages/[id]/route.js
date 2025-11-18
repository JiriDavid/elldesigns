import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";

function isAdmin(userId) {
  return userId && userId === process.env.ADMIN_CLERK_USER_ID;
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
    const message = await Message.findByIdAndDelete(params.id);

    if (!message) {
      return new Response(JSON.stringify({ error: "Message not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Message DELETE error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to delete message." }),
      { status: 500 }
    );
  }
}
