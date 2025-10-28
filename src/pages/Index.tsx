
import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import { useData } from "@/contexts/DataContext";

const Index = () => {
  const {products} = useData()
  
  const featuredProducts = products
    .filter(product => product.status == "available")
    .slice(0, 4);
    
  return (
    <PageLayout>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Categories />
      <HowItWorks />
    </PageLayout>
  );
};

export default Index;
