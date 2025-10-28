
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  //const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MTFC</span>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center">
          {/*isSearchOpen ? (
            <div className="w-full max-w-md transition-all duration-300 animate-fade-in flex">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2"
              >
                <span className="sr-only">Close search</span>
                <span className="h-4 w-4">✕</span>
              </Button>
            </div>
          ) : (*/
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link 
                to="/" 
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === '/' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {t('home')}
              </Link>
              <Link 
                to="/products" 
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === '/products' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {t('products')}
              </Link>
              <Link 
                to="/categories" 
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === '/categories' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {t('categories')}
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {t('about')}
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === '/contact' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {t('contact')}
              </Link>
            </nav>
          /*)*/}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <LanguageSelector />
          {
            /*
          }
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="mr-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        {*/}
        </div>
      </div>
      <div className="md:hidden border-t">
        <nav className="flex justify-between px-4 py-2 text-sm">
          <Link to="/" className="transition-colors hover:text-foreground/80">
            {t('home')}
          </Link>
          <Link to="/products" className="transition-colors hover:text-foreground/80">
            {t('products')}
          </Link>
          <Link to="/categories" className="transition-colors hover:text-foreground/80">
            {t('categories')}
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground/80">
            {t('about')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
