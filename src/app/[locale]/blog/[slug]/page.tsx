import BlurFade from "@/components/blur-fade";
import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";
import { getPost } from "@/services/blog/get-post";
import Markdown from "react-markdown";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getPost(params.locale, params.slug);

  console.log(post);

  return (
    <section id="blog">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex flex-col">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text={params.slug}
          />

          <BlurFadeText
            className="max-w-[600px] text-secondary md:text-xl"
            delay={BLUR_FADE_DELAY}
            text={params.slug}
          />

          <BlurFade
            key={post?.meta.title}
            delay={BLUR_FADE_DELAY * 8}
            className="mt-4"
          >
            <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-sm text-secondary">
              {post?.content}
            </Markdown>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
