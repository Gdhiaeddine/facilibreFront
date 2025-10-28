
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useData } from "@/contexts/DataContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const {categoriesList} = useData()
  
    
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about')}</h3>
            <p className="text-muted-foreground text-sm">
              {t("BrandDescription")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('products')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('products')}
                </Link>
              </li>
              
              {
                categoriesList.map((category)=>(
                <li key={category.id}>
                <Link to={`/products?category=${category.name.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {category.name}
                </Link>
                </li>
                ))
              }
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("help")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("faqs")}
                </Link>
              </li>
              <li>
                <Link to="/shipping-information" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("shippingInformation")}
                </Link>
              </li>
              <li>
                <Link to="/installments" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('installmentPlans')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <h6>{t('adresse')}</h6>
              <p>{t('adresse1')}</p>
              <p>{t('adresse2')}</p>
              <p>{t('adresse3')}</p>
              <p>{t('adresse4')}</p>
              <p>{t('adresse5')}</p>
              <p>{t('adresse6')}</p>
              <h6>{t('tel')}</h6>
              <p>Sétif: 036 61 63 97</p>
              <p>Bordj-Bou-Arreridj: 035 69 34 55</p>
              <p>El Yachir: 035 80 43 91</p>
              <h6>Service Clients: </h6>
              <p>0770 50 56 33</p>
              <p>0770 50 56 10</p>
              <h6>Administration: </h6>
              <p>0770 50 55 60</p>
              <p>0770 50 72 12</p>

            </address>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MTFC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
