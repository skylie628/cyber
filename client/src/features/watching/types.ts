import { z } from "zod";

const SimilarMovieSchema = z
  .object({
    id: z.number(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    title: z.string(),
    vote_count: z.number(),
    vote_average: z.number(),
    overview: z.string(),
    release_date: z.string(),
    poster_path: z.string().nullable(),
  })
  .partial();
const SimilarTVSchema = z
  .object({
    id: z.number(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    name: z.string(),
    vote_count: z.number(),
    vote_average: z.number(),
    overview: z.string(),
    first_air_date: z.string().nullable(),
    poster_path: z.string().nullable(),
  })
  .partial();

type SimilarMovieType = z.infer<typeof SimilarMovieSchema>;
type SimilarTVType = z.infer<typeof SimilarTVSchema>;
export { type SimilarMovieType, type SimilarTVType };
