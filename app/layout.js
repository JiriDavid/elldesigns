import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://elldesigns.example"),
  title: {
    default: "EllDesigns | Crafted with Passion, Styled for You",
    template: "%s | EllDesigns",
  },
  description:
    "EllDesigns crafts premium uniforms, bespoke suits, and African attire in Zimbabwe with futuristic elegance.",
  keywords: [
    "EllDesigns",
    "Zimbabwe fashion",
    "tailoring",
    "school uniforms",
    "bespoke suits",
    "African attire",
  ],
  openGraph: {
    title: "EllDesigns | Crafted with Passion, Styled for You",
    description:
      "High-end tailoring and fashion house specializing in uniforms, suits, and African attire in Zimbabwe.",
    locale: "en_ZW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EllDesigns",
    description: "Crafted with Passion, Styled for You",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <Navbar />
          <main className="flex min-h-screen flex-col gap-24 pt-24">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
