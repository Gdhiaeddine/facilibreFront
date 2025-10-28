
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { useLocation } from "react-router-dom";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const languages = {
    fr: "Français",
    en: "English",
    ar: "العربية",
  };

  const handleLanguageChange = (value: Language) => {
    // Set language without reloading the page to preserve the current route
    setLanguage(value);
  };

  return (
    <Select
      value={language}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
