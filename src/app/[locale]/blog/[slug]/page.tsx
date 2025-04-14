import BlurFadeText from "@/components/blur-fade-text";
import { BLUR_FADE_DELAY } from "@/lib/constants";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <section id="blog">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </section>
  );
}
