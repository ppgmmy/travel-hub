import huanggang from "../../content/guides/huanggang-futian.json";
import zhuhai from "../../content/guides/zhuhai-gongbei.json";
import type { Guide } from "./types";

const guides: Guide[] = [huanggang, zhuhai];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
