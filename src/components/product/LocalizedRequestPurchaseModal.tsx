
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Product } from "@/types/product";
import RequestPurchaseModal from "./RequestPurchaseModal";

interface LocalizedRequestPurchaseModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const LocalizedRequestPurchaseModal: React.FC<LocalizedRequestPurchaseModalProps> = ({
  product,
  open,
  onClose
}) => {
  const { getProductName, getProductDescription } = useLanguage();
  
  // If no product, return the original modal with null product
  if (!product) {
    return <RequestPurchaseModal product={null} open={open} onClose={onClose} />;
  }
  
  // Create a localized copy of the product
  const localizedProduct: Product = {
    ...product,
    name: product.name,
    description: product.description
  };
  
  return (
    <RequestPurchaseModal
      product={localizedProduct}
      open={open}
      onClose={onClose}
    />
  );
};

export default LocalizedRequestPurchaseModal;
