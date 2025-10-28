
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Check } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    {
      title: t("browseProducts"),
      description: t("browseProductsDescription"),
      icon: "🔍",
    },
    {
      title: t("requestPurchase"),
      description: t("requestPurchaseDescription"),
      icon: "📝",
    },
    {
      title: t("quickApproval"),
      description: t("quickApprovalDescription"),
      icon: "✅",
    },
    {
      title: t("enjoyYourPurchase"),
      description: t("enjoyYourPurchaseDescription"),
      icon: "🎉",
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("howItWorks")}</h2>
          <p className="text-lg text-muted-foreground">
            {t("HowItWorkDescription")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border transition-all hover:shadow-md"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border">
          <h3 className="text-2xl font-semibold mb-6 text-center">{t("whyChooseOurInstallmentPlans")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              t("plan1"),
              t("plan2"),
              t("plan3"),
              t("plan4"),

            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-primary-foreground flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
