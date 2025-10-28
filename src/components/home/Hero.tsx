
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl sm:text-5xl font-bold tracking-tight lg:text-6xl">
              {t("shopNow")}, <span className="text-primary">{t("payOverTime")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("headerDescription1")}
              <br />
              {t("headerDescription2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link to="/products">{t("browseProducts")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/installments">{t("howItWorks")}</Link>
              </Button>
            </div>
            <div className="pt-4 text-muted-foreground grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold text-primary">{t("easy")}</span>
                <span className="text-sm">{t("application")}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold text-primary">{t("fast")}</span>
                <span className="text-sm">{t("approval")}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold text-primary">{t("simple")}</span>
                <span className="text-sm">{t("installments")}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              alt="Shopping with installments"
              className="aspect-[4/3] w-full object-cover"
              src={`${import.meta.env.VITE_URL_IMAGE}/uploads/heroImage.png`}
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
