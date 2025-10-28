
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ProductCardProps {
  product: Product;
  onRequestPurchase: (product: Product) => void;
}

const ProductCard = ({ product, onRequestPurchase }: ProductCardProps) => {
  const { id, title, price, image } = product;
  const { t } = useLanguage();
  /*
  const lowestMonthlyPayment = installmentPlans.reduce(
    (min, plan) => (plan.monthlyPayment < min ? plan.monthlyPayment : min),
    installmentPlans[0]?.monthlyPayment || price
  );
  */
  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <Link to={`/product/${id}`} className="overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={`${import.meta.env.VITE_URL_IMAGE}/${image}`}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="flex-1 p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <div className="mt-2 flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">
              { `${price} ${t('formatCurrency')} `}
            </span>
            {
              //<StockBadge stock={stock} />
            }
          </div>
          <p className="text-sm text-muted-foreground">
            {
            //t('installmentPlans')} {lowestMonthlyPayment + t('formatCurrency') }/{t('month')
            }
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onRequestPurchase(product)}
          //disabled={stock === 0}
        >
          {t('requestPurchase')}
        </Button>
      </CardFooter>
    </Card>
  );
};

const StockBadge = ({ stock }: { stock: number }) => {
  const { t } = useLanguage();
  
  if (stock === 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        {t('outOfStock')}
      </Badge>
    );
  } else if (stock <= 5) {
    // Fix the issue with the replace method by using a safer approach
    const onlyLeftText = t('lowStock');
    return (
      <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200">
        {stock} {onlyLeftText}
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
        {t('inStock')}
      </Badge>
    );
  }
};

export default ProductCard;
