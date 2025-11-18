import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";

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
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
    const formatted = messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      createdAt: message.createdAt?.toISOString?.() || null,
    }));

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error) {
    console.error("Messages GET error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to fetch messages." }),
      { status: 500 }
    );
  }
}
