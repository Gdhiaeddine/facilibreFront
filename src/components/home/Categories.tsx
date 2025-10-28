
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useData } from "@/contexts/DataContext";

const Categories = () => {
  const { t } = useLanguage();
  const {categoriesList} = useData()
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">{t('categories')}</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((category, index) => (
            <Link to={`/products?category=${category.name.toLowerCase()}`} key={index}>
              <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}/${category.image}`}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-xl text-white">{category.name}</h3>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
