import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { Truck, Package, CreditCard, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ShippingInfoPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Shipping Information</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Truck className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Delivery Options</h3>
                    <p className="text-muted-foreground">
                      We offer standard delivery (3-5 business days) and express 
                      delivery (1-2 business days) options for all locations within 
                      the country.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Package className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Tracking Your Order</h3>
                    <p className="text-muted-foreground">
                      Once your order ships, you'll receive a confirmation email 
                      with tracking information that allows you to monitor your 
                      delivery status.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CreditCard className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Shipping Costs</h3>
                    <p className="text-muted-foreground">
                      Standard delivery is free for orders over $50. For orders 
                      under $50, a $5.99 shipping fee applies. Express delivery 
                      is available for an additional $12.99.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Info className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
                    <p className="text-muted-foreground">
                      Currently, we only ship within the country. International 
                      shipping options will be available in the near future.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Delivery Timeframes</h2>
              <p className="mb-4">
                Please note that delivery times are estimates and may vary based on your location and product availability:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Urban areas: 2-4 business days with standard shipping</li>
                <li>Suburban areas: 3-5 business days with standard shipping</li>
                <li>Rural areas: 5-7 business days with standard shipping</li>
                <li>Express delivery: 1-2 business days for all locations</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <p className="text-muted-foreground">
                Orders are typically processed within 1-2 business days before shipping. 
                During peak seasons or promotional periods, processing time may be slightly longer. 
                You'll receive an email notification when your order has been processed and another when it's shipped.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p className="text-muted-foreground">
                Some products, especially large appliances or furniture, may have specific 
                shipping restrictions or require special handling. These restrictions will 
                be clearly noted on the product page before purchase.
              </p>
            </div>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Our Shipping Department</h2>
            <p className="mb-4">
              For specific questions about shipping or delivery of your order:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: shipping@facilibre.com</li>
              <li>Phone: (555) 123-7890</li>
              <li>Hours: Monday-Friday, 9am-5pm</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingInfoPage;