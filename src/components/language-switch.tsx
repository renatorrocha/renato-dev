"use client";

import * as Flags from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/services/i18n/navigation";

export default function LanguageSwitch() {
  const language = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLanguage() {
    const newLanguage = language === "en" ? "pt" : "en";
    router.replace(pathname, { locale: newLanguage });
  }

  return (
    <Button variant="ghost" type="button" size="icon" onClick={toggleLanguage}>
      <Flag countryCode={getCountryCode(language)} className="w-5 rounded-sm" />
    </Button>
  );
}

function getCountryCode(languageCode: string) {
  const countryMapping: Record<string, string> = {
    en: "US",
    pt: "BR",
  };

  return countryMapping[languageCode] || "US";
}

type FlagProps = {
  countryCode: string;
  className?: string;
};

const Flag = ({ countryCode, className }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];

  if (!FlagComponent) {
    console.error(`Flag for country code ${countryCode} not found.`);
    return null;
  }

  return <FlagComponent key={countryCode} className={className} />;
};
