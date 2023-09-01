import { MovieType, TVType } from "@/types/types";
import { create } from "zustand";
type SectionBackdropItem = {
  trendingSectionBackdropItem?: MovieType | TVType;
  comingSoonSectionBackdropItem?: MovieType | TVType;
  airingSectionBackdropItem?: MovieType | TVType;
  getSectionBackdropItem: (section: string) => MovieType | TVType | undefined;
  setSectionBackdropItem: (
    section: string,
    newItem: MovieType | TVType
  ) => void;
};
const useSectionBackdropItemsStore = create<SectionBackdropItem>(
  (set, get) => ({
    trendingSectionBackdropItem: undefined,
    comingSoonSectionBackdropItem: undefined,
    airingSectionBackdropItem: undefined,
    getSectionBackdropItem: (section) => {
      return section === "trending"
        ? get().trendingSectionBackdropItem
        : section === "comingSoon"
        ? get().comingSoonSectionBackdropItem
        : section === "airing"
        ? get().airingSectionBackdropItem
        : undefined;
    },
    setSectionBackdropItem: (section, newItem) =>
      set((state) => ({
        trendingSectionBackdropItem:
          section === "trending" ? newItem : state.trendingSectionBackdropItem,
        comingSoonSectionBackdropItem:
          section === "comingSoon"
            ? newItem
            : state.comingSoonSectionBackdropItem,
        airingSectionBackdropItem:
          section === "airing" ? newItem : state.airingSectionBackdropItem,
      })),
  })
);
export { useSectionBackdropItemsStore };
