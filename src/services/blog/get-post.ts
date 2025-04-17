import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getPost(locale: string, slug: string) {
  const filePath = path.join(process.cwd(), "posts", locale, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(fileContent);

  return {
    slug,
    locale,
    content,
    meta: data as { title: string; date: string; description?: string },
  };
}
