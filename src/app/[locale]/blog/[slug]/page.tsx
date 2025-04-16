import BlurFade from "@/components/blur-fade";
import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";
import { getPost } from "@/services/blog/get-post";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "@/services/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getPost(params.locale, params.slug);
  const t = await getTranslations("Blog");

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <Link href={"/blog"}>
          <Button
            variant="ghost"
            className="group flex items-center gap-2 text-secondary hover:text-primary"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("backToBlog")}</span>
          </Button>
        </Link>
      </BlurFade>

      <Separator className="mb-4" />

      <div className="flex flex-col">
        <BlurFadeText
          delay={BLUR_FADE_DELAY}
          className="text-lg font-bold tracking-tighter text-primary sm:text-2xl xl:text-3xl/none"
          yOffset={8}
          text={post?.meta.title}
        />

        {post?.meta.description && (
          <BlurFadeText
            className="max-w-[600px] text-secondary md:text-xl"
            delay={BLUR_FADE_DELAY}
            text={post?.meta.description}
          />
        )}

        <BlurFade
          key={post?.meta.title}
          delay={BLUR_FADE_DELAY * 8}
          className="mt-4"
        >
          <Markdown className="prose dark:prose-invert max-w-full text-pretty rounded-md border bg-primary/10 p-2 font-sans text-sm text-secondary-foreground dark:bg-primary-foreground/20 dark:text-secondary">
            {post?.content}
          </Markdown>
        </BlurFade>
      </div>
    </section>
  );
}
