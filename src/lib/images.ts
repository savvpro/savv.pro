/**
 * Registry of generated images. When an ID is listed here, ImageSlot renders
 * the real file from /img/{id}.png instead of the styled placeholder.
 *
 * Add a new entry after dropping a file into public/img/{id}.png.
 */
export const GENERATED_IMAGES: Record<string, string> = {
  hero: "/img/hero.png",
  "doctrine-01": "/img/doctrine-01.png",
  "doctrine-02": "/img/doctrine-02.png",
  "doctrine-03": "/img/doctrine-03.png",
  "doctrine-04": "/img/doctrine-04.png",
  "partners-hero": "/img/partners-hero.png",
  "join-hero": "/img/join-hero.png",
  honesty: "/img/honesty.png",
  "ecosystem-moinc": "/img/ecosystem-moinc.png",
  "ecosystem-zovox": "/img/ecosystem-zovox.png",
};

export function getImage(id: string): string | undefined {
  return GENERATED_IMAGES[id];
}
