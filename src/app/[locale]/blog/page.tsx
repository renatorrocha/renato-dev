import { BlogCard } from "@/components/blog-card";
import BlurFade from "@/components/blur-fade";
import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";
import { getAllPosts } from "@/services/blog/get-all-posts";
import { getTranslations } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const posts = await getAllPosts(params.locale);
  const t = await getTranslations("Blog");

  return (
    <section id="blog">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex flex-col gap-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text={t("title")}
          />

          <BlurFadeText
            className="max-w-[600px] text-secondary md:text-xl"
            delay={BLUR_FADE_DELAY}
            text={t("description")}
          />
        </div>

        <div className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post, idx) => (
              <BlurFade
                key={post?.meta.title}
                delay={BLUR_FADE_DELAY * 8 + idx * 0.05}
              >
                <BlogCard
                  key={post?.meta.title}
                  title={post?.meta.title ?? ""}
                  description={post?.meta.description ?? ""}
                  date={new Date(post?.meta.date ?? "")}
                  href={`/blog/${post?.meta.title}`}
                />
              </BlurFade>
            ))
          ) : (
            <BlurFadeText
              className="mx-auto text-center text-muted-foreground"
              delay={BLUR_FADE_DELAY + 1}
              text={t("noPosts")}
            />
          )}
        </div>
      </div>
    </section>
  );
}
