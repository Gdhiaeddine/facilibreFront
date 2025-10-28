
import { useState } from "react";
import { Product } from "@/types/product";
import RequestPurchaseModal from "../product/RequestPurchaseModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LocalizedProductCard from "../product/LocalizedProductCard";


interface FeaturedProductsProps {
  products: Product[];
}


const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleRequestPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{t('featuredProducts')}</h2>
          <Link to="/products" className="text-primary hover:underline mt-2 sm:mt-0">
            {t('viewMore')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <LocalizedProductCard
              key={product.id}
              product={product}
              onRequestPurchase={handleRequestPurchase}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/products">{t('products')}</Link>
          </Button>
        </div>
        
        <RequestPurchaseModal
          product={selectedProduct}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
