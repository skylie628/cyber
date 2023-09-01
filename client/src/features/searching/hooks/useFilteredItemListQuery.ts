import { currentURLPathAtom, mediaTypeAtom } from "@/App";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { MovieFilterList, TVFilterList } from "../../profile/type";
import { getFilteredItemListQuery } from "../../profile/queries";
export const useFilteredItemListQuery = (
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
  extra?: Record<string, any>
) => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [currentURLPath] = useAtom(currentURLPathAtom);
  console.log(paramList, period, extra, currentURLPath);
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...getFilteredItemListQuery(mediaType, currentURLPath, paramList, period),
    ...(extra ?? {}),
  });
  return { data, hasNextPage, fetchNextPage, mediaType };
};
