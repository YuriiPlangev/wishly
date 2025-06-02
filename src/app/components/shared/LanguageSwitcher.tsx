import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "../ui/button";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLang = i18n.language === "en" ? "uk" : "en";
    await i18n.changeLanguage(newLang);
  };

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        type="button"
        aria-label="Language"
        size="icon"
        onClick={toggleLanguage}
      >
        <Globe size={20} />
      </Button>
    </div>
  );
}
