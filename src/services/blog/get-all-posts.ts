import fs from "fs";
import path from "path";
import { getPost } from "./get-post";

export async function getAllPosts(locale: string) {
  const dir = path.join(process.cwd(), "posts", locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      return await getPost(locale, slug);
    }),
  );

  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
}
