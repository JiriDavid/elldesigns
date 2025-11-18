import dotenv from "dotenv";

// Load Next.js-style env files so the script can be run locally
dotenv.config({ path: ".env.local" });
dotenv.config();

const [{ connectToDatabase }, { default: Product }] = await Promise.all([
  import("../lib/db.js"),
  import("../models/Product.js"),
]);

const homepageMedia = {
  uniforms:
    "https://res.cloudinary.com/drahvivoj/image/upload/v1759955196/generated-image_7_tmtucm.jpg",
  workSuits:
    "https://res.cloudinary.com/drahvivoj/image/upload/v1759953376/generated-image_3_easydm.jpg",
  blazers:
    "https://res.cloudinary.com/drahvivoj/image/upload/v1759955198/blazer2_cfa8iy.jpg",
  tracksuits:
    "https://res.cloudinary.com/drahvivoj/image/upload/v1759955201/tracksuit4_slh7zy.jpg",
  africanAttire:
    "https://res.cloudinary.com/drahvivoj/image/upload/v1759955834/generated-image_8_is38pf.jpg",
};

const addTransform = (url, transformation) => {
  const [base, rest] = url.split("/upload/");
  if (!rest) return url;
  return `${base}/upload/${transformation}/${rest}`;
};

const productSeed = [
  {
    name: "Heritage Scholars Uniform Set",
    category: "School Uniforms",
    description:
      "Structured blazers, breathable shirts, and tailored skirts engineered to survive every assembly and after-school rehearsal.",
    price: 185,
    sizes: ["Youth 6", "Youth 8", "Youth 10", "Adult XS", "Adult S", "Adult M"],
    media: [
      homepageMedia.uniforms,
      addTransform(homepageMedia.uniforms, "c_crop,g_auto,h_900,w_900"),
    ],
  },
  {
    name: "Aurora Prefect Ensemble",
    category: "School Uniforms",
    description:
      "A modern prefect look with reinforced seams, memory-press pleats, and tonal piping for instant authority.",
    price: 210,
    sizes: [
      "Youth 10",
      "Youth 12",
      "Adult XS",
      "Adult S",
      "Adult M",
      "Adult L",
    ],
    media: [
      addTransform(homepageMedia.uniforms, "c_fill,w_1400,h_900"),
      addTransform(homepageMedia.uniforms, "c_fill,w_1200,h_1200"),
    ],
  },
  {
    name: "Vanguard Midnight Suit",
    category: "Work Suits",
    description:
      "Midnight stretch-wool suiting with sculpted shoulders, interior passport pockets, and moisture-control lining.",
    price: 640,
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
    media: [
      homepageMedia.workSuits,
      addTransform(homepageMedia.workSuits, "c_crop,g_auto,w_1000,h_1300"),
    ],
  },
  {
    name: "Luminary Horizon Suit",
    category: "Work Suits",
    description:
      "Graphite two-piece with convertible waistcoat and laser-cut vents that keep executives cool in boardrooms and hangars alike.",
    price: 720,
    sizes: ["34S", "36S", "38R", "40R", "42L", "44L"],
    media: [
      addTransform(homepageMedia.workSuits, "c_fill,w_1600,h_1000"),
      addTransform(homepageMedia.workSuits, "c_fill,g_auto,w_1200,h_800"),
    ],
  },
  {
    name: "Crimson Crest Statement Blazer",
    category: "Blazers",
    description:
      "Runway-grade crimson blazer finished with satin peak lapels, Swarovski crest embroidery, and tonal covered buttons.",
    price: 520,
    sizes: ["2", "4", "6", "8", "10", "12"],
    media: [
      homepageMedia.blazers,
      addTransform(homepageMedia.blazers, "c_crop,g_center,w_1000,h_1000"),
    ],
  },
  {
    name: "Obsidian Velvet Dinner Jacket",
    category: "Blazers",
    description:
      "Midnight velvet jacket with hand-beaded cuffs and an internal phone holster to glide from gala to after-party.",
    price: 560,
    sizes: ["34", "36", "38", "40", "42", "44"],
    media: [
      addTransform(homepageMedia.blazers, "c_fill,w_1500,h_900"),
      addTransform(homepageMedia.blazers, "c_crop,g_faces,w_900,h_1200"),
    ],
  },
  {
    name: "Velocity Luxe Tracksuit",
    category: "Tracksuits",
    description:
      "Performance knit tracksuit with bonded seams, iridescent piping, and moisture-wicking mesh for travel days.",
    price: 280,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    media: [
      homepageMedia.tracksuits,
      addTransform(homepageMedia.tracksuits, "c_fill,g_auto,w_1400,h_900"),
    ],
  },
  {
    name: "Apex Motion Tracksuit",
    category: "Tracksuits",
    description:
      "Two-tone tracksuit with magnetic collar closure, cuff thumb loops, and reflective taping for dawn training runs.",
    price: 295,
    sizes: ["XS", "S", "M", "L", "XL"],
    media: [
      addTransform(homepageMedia.tracksuits, "c_crop,g_auto,w_1100,h_1300"),
      addTransform(homepageMedia.tracksuits, "c_fill,w_1200,h_800"),
    ],
  },
  {
    name: "Ubuntu Royale Couture Set",
    category: "African Attire",
    description:
      "Hand-loomed Ankara set with architectural peplum, brass kola-nut buttons, and silk organza lining.",
    price: 680,
    sizes: ["Custom 32", "Custom 34", "Custom 36", "Custom 38", "Custom 40"],
    media: [
      homepageMedia.africanAttire,
      addTransform(homepageMedia.africanAttire, "c_crop,g_auto,w_1000,h_1200"),
    ],
  },
  {
    name: "Nyanga Sunrise Ensemble",
    category: "African Attire",
    description:
      "Sunrise-hued couture gown with detachable capelet, hand-beaded bodice, and dramatic mermaid skirt.",
    price: 720,
    sizes: ["XS", "S", "M", "L"],
    media: [
      addTransform(homepageMedia.africanAttire, "c_fill,w_1500,h_1000"),
      addTransform(homepageMedia.africanAttire, "c_fill,g_auto,w_1200,h_900"),
    ],
  },
];

async function seedProducts() {
  await connectToDatabase();

  const results = [];
  for (const product of productSeed) {
    const res = await Product.updateOne(
      { name: product.name },
      { $set: product },
      { upsert: true }
    );

    let status = "unchanged";
    if (res.upsertedCount && res.upsertedCount > 0) {
      status = "inserted";
    } else if (res.modifiedCount && res.modifiedCount > 0) {
      status = "updated";
    }

    results.push({ name: product.name, status });
  }

  console.table(results);
  const inserted = results.filter(
    (entry) => entry.status === "inserted"
  ).length;
  const updated = results.filter((entry) => entry.status === "updated").length;
  console.log(
    `Products inserted: ${inserted}, updated: ${updated}. Total processed: ${results.length}.`
  );
}

seedProducts()
  .then(() => {
    console.log("Product seeding complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed products:", error);
    process.exit(1);
  });
