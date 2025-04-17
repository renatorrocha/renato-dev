"use client";

import { Link } from "@/services/i18n/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useLocale } from "next-intl";

interface IBlogCard {
  title: string;
  description?: string;
  href: string;
  date: Date;
}

export function BlogCard({ title, href, description, date }: IBlogCard) {
  const language = useLocale();

  const languageCode = language === "pt" ? "pt-BR" : "en-US";

  return (
    <Link href={href}>
      <Card
        className={
          "flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
        }
      >
        <CardHeader className="px-2">
          <CardTitle className="mt-1 text-base text-primary dark:text-secondary">
            {title}
          </CardTitle>
        </CardHeader>

        {description && (
          <CardContent className="mt-auto flex flex-col px-2">
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        )}

        <CardFooter className="flex justify-end px-2 pb-2 text-center">
          <p className="text-sm text-muted-foreground">
            {date.toLocaleDateString(languageCode)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
