import { z } from "zod";
import { MovieSchema, TVSchema } from "@/types/types";
interface MovieFilterList {
  sort_by: string;
  year?: number;
  with_genres?: string;
}

interface TVFilterList {
  sort_by: string;
  first_air_date_year?: number;
  with_genres?: string;
  with_status?: string;
  with_type?: string;
}
const FilteredMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional(),
  total_pages: z.number().optional(),
});

const FilteredTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
  total_pages: z.number().optional(),
});
type FilteredMovieListType = z.infer<typeof FilteredMovieList>;
type FilteredTVListType = z.infer<typeof FilteredTVList>;
export {
  type MovieFilterList,
  type TVFilterList,
  FilteredMovieList,
  FilteredTVList,
  type FilteredMovieListType,
  type FilteredTVListType,
};
