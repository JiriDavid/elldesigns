import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    if (
      !process.env.CLOUDINARY_API_SECRET ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_CLOUD_NAME
    ) {
      return new Response(
        JSON.stringify({
          error: "Cloudinary environment variables are missing.",
        }),
        { status: 500 }
      );
    }

    const body = await request.json();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp,
      folder: body.folder || "elldesigns",
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return new Response(
      JSON.stringify({
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: paramsToSign.folder,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary signature error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to create signature." }),
      { status: 500 }
    );
  }
}
