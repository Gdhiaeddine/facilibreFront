
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
//import { products } from "@/data/products";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useData } from "@/contexts/DataContext";

const CategoriesPage = () => {
  const {products, categoriesList} = useData()
  const { t } = useLanguage();

  let categories = []
  if (categoriesList && products) {
    categories = Array.from(
      new Set(
        products.map((product) => {
          const category = categoriesList.find(
            (cat) => cat.id === product.category_id
          );
          return category;
        })
      )
    ).filter(Boolean); // ✅ remove undefined categories
  }
  return (
    <PageLayout>
      <section className="py-12">
        <div className="container">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{t('categories')}</h1>
              <p className="text-muted-foreground">{t('browse')} {t('categories').toLowerCase()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const productCount = products.filter(
                    (product) => product.category_id === category.id
                ).length;
                return (
                  <Link
                    key={category.name}
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="block group"
                  >
                    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_URL_IMAGE}/${category.image}` || "https://via.placeholder.com/400x300"}
                          alt={category}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <CardContent className="p-4 relative z-10">
                            <h3 className="font-semibold text-xl text-white">{category.name}</h3>
                            <p className="text-white/80 text-sm">{productCount} {t('products')}</p>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CategoriesPage;
