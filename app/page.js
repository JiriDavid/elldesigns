import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BrandStats from "@/components/home/BrandStats";
import SpotlightCarousel from "@/components/home/SpotlightCarousel";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStats />
      <SpotlightCarousel />
      <FeaturedCategories />
      <Testimonials />
    </>
  );
}
