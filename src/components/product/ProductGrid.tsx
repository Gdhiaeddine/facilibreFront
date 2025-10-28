
import { useState } from "react";
import { Product } from "@/types/product";
import RequestPurchaseModal from "./RequestPurchaseModal";
import LocalizedProductCard from "./LocalizedProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <LocalizedProductCard
            key={product.id}
            product={product}
            onRequestPurchase={handleRequestPurchase}
          />
        ))}
      </div>
      
      <RequestPurchaseModal
        product={selectedProduct}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductGrid;
