import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  title: string;
  channel: string;
  published: string;
  duration: string;
  slug: string;
  content: string;
  thumbnail: string | null;
};

export function getSortedPosts(): Post[] {
  const postsPath = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsPath);

  const posts: Post[] = files
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const fullPath = path.join(postsPath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      const { content: body, data: metadata } = matter(fileContents);
      const slug = filename.replace(".md", "");

      const videoMatch = body.match(
        /https:\/\/www\.youtube\.com\/watch\?v=([^"&\s]+)/
      );
      const videoId = videoMatch ? videoMatch[1] : null;
      const thumbnail = videoId
        ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        : null;

      return {
        title: metadata.title,
        channel: metadata.channel,
        published: metadata.published,
        duration: metadata.duration,
        slug,
        content: body,
        thumbnail,
      };
    });

  return posts.sort((a, b) => (a.published < b.published ? 1 : -1));
}
