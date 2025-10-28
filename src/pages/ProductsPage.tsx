
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProductGrid from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useData } from "@/contexts/DataContext";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const {products, categoriesList} = useData()



  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategoryFilter(categoryParam.toLowerCase());
    }
  }, [searchParams]);

  // Update URL when category filter changes
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };
  // Get unique categories
  //const categories = ["all", ...new Set(products.map(product => product.category.toLowerCase()))];
  const categories = ["all", ...categoriesList.map(c => c.name.toLowerCase())];

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryName = categoriesList.find(cat => cat.id === product.category_id)?.name?.toLowerCase();

    const matchesCategory = categoryFilter === "all" || 
                            categoryName === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "stock-high-low":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <PageLayout>
      <section className="py-8">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{t('products')}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6">
              <div className="flex items-center w-full md:w-auto flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    type="search"
                    placeholder={`${t('browse')}...`}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-full md:w-40">
                  <Select 
                    value={categoryFilter} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('categories')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">{t('featured')}</SelectItem>
                      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                      <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                      <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                      <SelectItem value="stock-high-low">Stock: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground">Try changing your search or filter criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    //setCategoryFilter("all");
                    handleCategoryChange("all");
                    setSortBy("default");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductsPage;
