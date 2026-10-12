import qianhai from "../../content/guides/qianhai.json";
import zhuhai from "../../content/guides/zhuhai-gongbei.json";
import type { Guide } from "./types";

const guides: Guide[] = [qianhai, zhuhai];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
