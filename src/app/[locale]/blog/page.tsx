import { BlogCard } from "@/components/blog-card";
import BlurFade from "@/components/blur-fade";
import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";
import { useTranslations } from "next-intl";

const posts = [
  {
    title: "My First Post",
    description: "This is my first post",
    date: "2021-01-01",
  },
  {
    title: "My Second Post",
    description: "This is my second post",
    date: "2021-01-02",
  },
  {
    title: "My Third Post",
    tags: ["tag1", "tag2", "tag3"],
    date: "2021-01-03",
  },
];

export default function BlogPage() {
  const t = useTranslations("Blog");

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
          {posts.map((post, idx) => (
            <BlurFade
              key={post.title}
              delay={BLUR_FADE_DELAY * 10 + idx * 0.05}
            >
              <BlogCard
                key={post.title}
                title={post.title}
                description={post.description}
                date={new Date(post.date)}
                href={`/blog/${post.title}`}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
