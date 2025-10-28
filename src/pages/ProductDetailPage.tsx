
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
// import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LocalizedRequestPurchaseModal from "@/components/product/LocalizedRequestPurchaseModal";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useData } from "@/contexts/DataContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {products, categoriesList} = useData()
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, getProductName, getProductDescription } = useLanguage();
  const [premierVers, setPremierVers] = useState(0)
  const [prixReste, setPrixReste] = useState()
  const [versMois, setVersMois] = useState()

  const [mois, setMois] = useState(0)
  
  const product = products.find(p => p.id == id);
  const categoryName = categoriesList.find(c => c.id === product.category_id)?.name;
  
  const form = useForm({
      defaultValues: {
        premierVersement: 0,
        nombreMois: 0,
      }
    });
  
  const handleSetPremierVers = async(value)=>{
    setPremierVers(value)
  }
  const handleSetMois = (value)=>{
    setMois(value)
  }
  
  const handleCalculate = ()=>{

    const reste = product.price - premierVers;
    let percentage = 0.03
    if (mois > 0 && reste > 0) {
      if(mois == 4) percentage = 0.1
      if(mois == 4) percentage = 0.15

    const total = reste + reste * percentage;
    setPrixReste(total.toFixed(2));
    setVersMois((total / mois).toFixed(2));
    } 
  }

    
  if (!product) {
    return (
      <PageLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/products">{t('products')}</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Get localized product name and description
  const localizedName = getProductName(product.id);
  const localizedDescription = getProductDescription(product.id);
  
  return (
    <PageLayout>
      <div className="container py-8">
        <Link to="/products" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('products')}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border aspect-square">
              <img
                src={`${import.meta.env.VITE_URL_IMAGE}/${product.image}`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/*product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`rounded-md overflow-hidden border h-20 w-20 flex-shrink-0 transition-all ${
                      activeImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${localizedName} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )*/}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{categoryName}</Badge>
                {product.status === "available"? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    {t('available')}
                  </Badge>
                ) : (
                  <Badge variant="destructive">{t('outOfStock')}</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold">{product.title}</h1>
              
              <div className="mt-4 space-y-2">
                <p className="text-2xl font-semibold text-primary">{product.price +' '+ t('formatCurrency')}</p>
                <div className="text-sm text-muted-foreground">
                  <p>{t('availablePaymentOptions')}:</p>
                  <div className="mt-2 ml-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {t('immediatePayment')}
                      </Badge>
                      <span className="text-xs">({t('noAccountRequired')})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                        {t('installmentPlan')}
                      </Badge>
                      <span className="text-xs">({t('accountRequired')})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">{t('installmentPlans')}</h3>
              
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
              <Input placeholder="Premier Versement"
              name="premierVersement"
              type="number"
              required
              onChange={(e) => handleSetPremierVers(parseFloat(e.target.value))}
              />
              <Input 
              placeholder="Nombre des mois"
              name="nombreMois"
              type="number"
              required
              onChange={(e) => handleSetMois(parseInt(e.target.value))}
              />
              </div>
              <Button 
              size="lg" 
              className="w-full my-5"
              onClick={() => handleCalculate()}
              >
              Calculate
              </Button>
              <h6 className="block mb-4">Resultat</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
              <Input placeholder="Le Prix Total" 
              disabled 
              value={prixReste || ""}
              />
              <Input placeholder="Versement / mois" 
              disabled
              value={versMois || ""}
              />
              </div>
              </div>
            </div>
            <Separator />
            
            <Button 
              size="lg" 
              className="w-full"
              disabled={product.status != "available"}
              onClick={() => setIsModalOpen(true)}
            >
              {t('requestPurchase')}
            </Button>
            
            <Tabs defaultValue="description" className="w-full mt-8">
              <TabsList>
                <TabsTrigger value="description">{t('description')}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <LocalizedRequestPurchaseModal
          product={product}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
function setVersMois(value: any) {
  throw new Error("Function not implemented.");
}

