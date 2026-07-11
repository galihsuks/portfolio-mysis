export type CategoryId =
  | "social-media-1"
  | "curriculum-vitae"
  | "photo-video-1"
  | "big-project"
  | "branding";

export type CategoryLabel = {
  id: CategoryId;
  text: string;
  className: string;
  blurClassName: string;
  drift: number;
  transitionOutY: number;
};

export const categoryLabels: CategoryLabel[] = [
  {
    id: "social-media-1",
    text: "Social\nMedia",
    className: "left-[12%] top-[14%] text-[clamp(1.7rem,2.4vw,2.7rem)]",
    blurClassName: "blur-[2.5px]",
    drift: 22,
    transitionOutY: -572 * 1.5,
  },
  {
    id: "curriculum-vitae",
    text: "Curriculum\nVitae",
    className: "right-[20%] top-[11%] text-[clamp(1.9rem,2.6vw,3rem)]",
    blurClassName: "blur-[1.5px]",
    drift: 16,
    transitionOutY: -196 * 1.5,
  },
  {
    id: "photo-video-1",
    text: "Photo\nand\nVideo",
    className: "left-[6%] top-[42%] text-[clamp(1rem,1.45vw,1.45rem)]",
    blurClassName: "blur-[4px]",
    drift: 28,
    transitionOutY: -928 * 1.5,
  },
  {
    id: "big-project",
    text: "Big\nProject",
    className: "left-[50%] top-[31%] text-[clamp(1rem,1.35vw,1.3rem)]",
    blurClassName: "blur-[2px]",
    drift: 14,
    transitionOutY: -318 * 1.5,
  },
  {
    id: "branding",
    text: "Branding",
    className: "right-[13%] top-[33%] text-[clamp(1rem,1.35vw,1.3rem)]",
    blurClassName: "blur-[1px]",
    drift: 10,
    transitionOutY: -66 * 1.5,
  },
  {
    id: "curriculum-vitae",
    text: "Curriculum\nVitae",
    className: "left-[24%] top-[60%] text-[clamp(1rem,1.35vw,1.3rem)]",
    blurClassName: "blur-[3px]",
    drift: 24,
    transitionOutY: -752 * 1.5,
  },
  {
    id: "social-media-1",
    text: "Social\nMedia",
    className: "right-[23%] top-[52%] text-[clamp(1rem,1.35vw,1.3rem)]",
    blurClassName: "blur-[2.25px]",
    drift: 18,
    transitionOutY: -424 * 1.5,
  },
  {
    id: "big-project",
    text: "Big\nProject",
    className: "left-[4%] bottom-[18%] text-[clamp(1.5rem,2vw,2.4rem)]",
    blurClassName: "blur-[1.75px]",
    drift: 15,
    transitionOutY: -286 * 1.5,
  },
  {
    id: "branding",
    text: "Brand\ning",
    className: "left-[53%] bottom-[11%] text-[clamp(1.1rem,1.55vw,1.7rem)]",
    blurClassName: "blur-[3.5px]",
    drift: 26,
    transitionOutY: -810 * 1.5,
  },
  {
    id: "photo-video-1",
    text: "Photo\nand\nVideo",
    className: "right-[8%] bottom-[22%] text-[clamp(1.65rem,2.2vw,2.6rem)]",
    blurClassName: "blur-[2.75px]",
    drift: 20,
    transitionOutY: -694 * 1.5,
  },
];

export const categoryContent: Record<
  CategoryId,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  "social-media-1": {
    eyebrow: "Social Media",
    title: "Campaign visuals, feeds, and motion that still feel human.",
    description:
      "Space ini nanti bisa kita isi kumpulan konten Instagram, campaign set, dan eksperimen visual yang fokus ke ritme brand dan engagement.",
  },
  "curriculum-vitae": {
    eyebrow: "Curriculum Vitae",
    title: "Perjalanan belajar dan pengalaman yang disusun dengan bersih.",
    description:
      "Cocok untuk section CV digital, education timeline, pengalaman kerja, dan tools yang kamu kuasai dalam format yang lebih editorial.",
  },
  "photo-video-1": {
    eyebrow: "Photo and Video",
    title: "Frame, movement, and edits with a softer cinematic feel.",
    description:
      "Nanti bagian ini bisa kita isi gallery foto, preview video, atau still frames yang terasa seperti satu dunia visual yang utuh.",
  },
  "big-project": {
    eyebrow: "Big Project",
    title: "Project besar yang butuh ruang cerita lebih panjang.",
    description:
      "Bagian ini pas untuk case study: brief, problem, process, result, dan potongan visual utama yang bisa dibuka satu per satu.",
  },
  branding: {
    eyebrow: "Branding",
    title: "Identity systems, direction boards, and branded details.",
    description:
      "Bisa kita ubah jadi landing untuk brand exploration, logo systems, color direction, dan aplikasi identitas di berbagai media.",
  },
};
