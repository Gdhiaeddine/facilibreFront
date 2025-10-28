
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface LocalizedProductCardProps {
  product: Product;
  onRequestPurchase: (product: Product) => void;
}

const LocalizedProductCard: React.FC<LocalizedProductCardProps> = ({ 
  product, 
  onRequestPurchase 
}) => {
  const { getProductName, getProductDescription } = useLanguage();
  
  // Create a localized copy of the product
  const localizedProduct: Product = {
    ...product,
    name: product.name,
    description: getProductDescription(product.id)
  };
  
  return (
    <ProductCard
      product={localizedProduct}
      onRequestPurchase={onRequestPurchase}
    />
  );
};

export default LocalizedProductCard;
