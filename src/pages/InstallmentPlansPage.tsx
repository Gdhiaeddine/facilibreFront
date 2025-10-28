import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/PageLayout";
import { Check, List, Book, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const InstallmentPlansPage = () => {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: "3-Month Plan",
      description: "Perfect for smaller purchases",
      price: "No additional fees",
      features: [
        "3 equal monthly payments",
        "First payment due at checkout",
        "No interest or hidden fees",
        "Automatic scheduled payments",
        "Available for purchases up to $500"
      ]
    },
    {
      name: "6-Month Plan",
      description: "Our most popular payment option",
      price: "No additional fees",
      features: [
        "6 equal monthly payments",
        "First payment due at checkout",
        "No interest or hidden fees",
        "Automatic scheduled payments",
        "Available for purchases up to $1,000",
        "Early payoff option with no penalty"
      ],
      popular: true
    },
    {
      name: "12-Month Plan",
      description: "For larger purchases",
      price: "No additional fees",
      features: [
        "12 equal monthly payments",
        "First payment due at checkout",
        "No interest or hidden fees",
        "Automatic scheduled payments",
        "Available for purchases up to $5,000",
        "Early payoff option with no penalty",
        "Flexible payment date selection"
      ]
    }
  ];
  
  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-4 text-center">{t('installmentPlans')}</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Shop now and pay over time with our flexible installment options. No hidden fees, no interest charges.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.popular ? 'border-primary shadow-lg' : 'border-border'} relative`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-lg mb-4">{plan.price}</div>
                <Separator className="mb-4" />
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/products" className="w-full">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How Our Installment Plans Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <List className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
              <p className="text-muted-foreground">Select the installment plan that works best for your budget during checkout.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simple Registration</h3>
              <p className="text-muted-foreground">Create an account and provide payment information for your scheduled payments.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Automatic Payments</h3>
              <p className="text-muted-foreground">Your payments will be automatically processed on the scheduled dates.</p>
            </div>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Important Information</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Installment plans are available to customers with accounts in good standing.</li>
              <li>• A valid credit or debit card is required for automatic payments.</li>
              <li>• Missed payments may result in your account being suspended until payment is made.</li>
              <li>• You can view your payment schedule and history in your account dashboard.</li>
              <li>• Early payoff is available at any time with no additional fees.</li>
            </ul>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
            <Link to="/products">
              <Button size="lg">Shop Products Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InstallmentPlansPage;