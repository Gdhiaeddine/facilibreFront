
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/adminPages/Login";
import Dashboard from "./pages/adminPages/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/adminComponents/AppLayout";
import { Products } from "./pages/adminPages/Products";
import { ProductDetail } from "./pages/adminPages/ProductDetail";
import { Requests } from "./pages/adminPages/Requests";
import { RequestDetail } from "./pages/adminPages/RequestDetail";
import { Settings } from "./pages/adminPages/Settings";
import { Categories } from "./pages/adminPages/Categories";
import { CategoryDetail } from "./pages/adminPages/CatergorieDetail";
import { AddCategory } from "./pages/adminPages/AddCatergorie";
import { AddProduct } from "./pages/adminPages/AddProduct";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import FAQsPage from "./pages/FAQsPage";
import InstallmentPlansPage from "./pages/InstallmentPlansPage";
import { DataProvider } from "./contexts/DataContext";




const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};


const App = () => (
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping-information" element={<ShippingInfoPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/installments" element={<InstallmentPlansPage />} />

            <Route path="*" element={<NotFound />} />

            <Route path="/admin/login" element={< Login/>} />
            <Route 
        path="/admin"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
          <Route 
        path="/admin/products" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Products />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/products/new" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddProduct />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/products/:id/edit" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProductDetail />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/categories" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Categories />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/categories/new" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddCategory />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/categories/:id/edit" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <CategoryDetail />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/requests" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Requests />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/requests/:id" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <RequestDetail />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </ProtectedRoute>
        }  />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </DataProvider>
    </LanguageProvider>
  </QueryClientProvider>
  </AuthProvider>
);

export default App;
