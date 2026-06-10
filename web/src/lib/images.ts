import type { ImageMetadata } from "astro";

type ImageGlob = Record<string, { default: ImageMetadata }>;

/**
 * Build a filename resolver over an `import.meta.glob` result so data entries
 * reference images by filename string instead of a per-entry top-of-file import.
 *
 * The returned value is the same `ImageMetadata` an explicit import yields, so
 * `astro:assets` `<Image>` / `getImage()` optimization keeps working unchanged.
 *
 * `prefix` must match the glob key prefix (e.g. "../assets/people/"). Missing
 * names throw at build time so a typo fails loudly rather than rendering broken.
 */
export function imageByName(glob: ImageGlob, prefix: string) {
  return (name: string): ImageMetadata => {
    const mod = glob[prefix + name];
    if (!mod) {
      const available = Object.keys(glob)
        .map((k) => k.slice(prefix.length))
        .join(", ");
      throw new Error(`Image "${name}" not found under ${prefix}. Available: ${available}`);
    }
    return mod.default;
  };
}
