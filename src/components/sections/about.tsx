import { BLUR_FADE_DELAY, DATA } from "@/lib/constants";
import BlurFade from "../blur-fade";
import Markdown from "react-markdown";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("About");
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-xl font-bold">{t("aboutMe")}</h2>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-sm text-secondary">
          {t("resume")}
        </Markdown>
      </BlurFade>
    </section>
  );
}
