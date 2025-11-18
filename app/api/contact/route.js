import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Message.create({ name, email, message, source: "contact" });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Contact POST error:", error);
    return new Response(
      JSON.stringify({
        error: "Unable to send message. Please try again later.",
      }),
      {
        status: 500,
      }
    );
  }
}
