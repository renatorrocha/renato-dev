import BlurFade from "@/components/blur-fade";
import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";
import { getPost } from "@/services/blog/get-post";
import Markdown from "react-markdown";
import { Button, buttonVariants } from "@/components/ui/button";
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
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-2xl">Post not found</p>
        <Link href={"/blog"} className={buttonVariants({ variant: "ghost" })}>
          Back to blog
        </Link>
      </div>
    );
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

      <Separator className="mb-6" />

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
          className="mt-8"
        >
          <div className="blog-content rounded-md border bg-primary/5 p-6 dark:bg-primary-foreground/10">
            <Markdown className="prose prose-slate dark:prose-invert prose-p:text-base prose-p:leading-relaxed prose-p:my-5 prose-strong:font-bold prose-strong:text-primary prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-primary prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2 prose-a:text-primary hover:prose-a:underline max-w-none text-secondary-foreground dark:text-secondary">
              {post?.content}
            </Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
