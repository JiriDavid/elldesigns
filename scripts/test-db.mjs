import dotenv from "dotenv";

// Prefer .env.local (Next.js development convention) but fall back to default .env
dotenv.config({ path: ".env.local" });
dotenv.config();

const { connectToDatabase } = await import("../lib/db.js");

try {
  const conn = await connectToDatabase();
  console.log("Connected to MongoDB:", conn.connection.host);
  process.exit(0);
} catch (error) {
  console.error("Failed to connect to MongoDB");
  console.error(error);
  process.exit(1);
}
