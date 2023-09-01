import { z } from "zod";
const MovieSchema = z.object({
  poster_path: z.string().nullable().optional(),
  adult: z.boolean().optional(),
  overview: z.string().optional(),
  release_date: z.string().optional(),
  original_title: z.string().optional(),
  genre_ids: z.array(z.number()).optional(),
  id: z.number().optional(),
  media_type: z.literal("movie").optional(),
  original_language: z.string().optional(),
  title: z.string().optional(),
  backdrop_path: z.string().nullable().optional(),
  popularity: z.number().optional(),
  vote_count: z.number().optional(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
});
const TVSchema = z.object({
  poster_path: z.string().nullable().optional(),
  popularity: z.number().optional(),
  id: z.number().optional(),
  overview: z.string().optional(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number().optional(),
  media_type: z.literal("tv").optional(),
  first_air_date: z.string().optional(),
  origin_country: z.array(z.string()).optional(),
  genre_ids: z.array(z.number()).optional(),
  original_language: z.string().optional(),
  vote_count: z.number().optional(),
  name: z.string().optional(),
  original_name: z.string().optional(),
});
const GenreSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
const GenreListSchema = z.object({
  genres: z.array(GenreSchema),
});
type GenreType = z.infer<typeof GenreSchema>;
type MovieType = z.infer<typeof MovieSchema>;
type TVType = z.infer<typeof TVSchema>;
export {
  GenreListSchema,
  MovieSchema,
  TVSchema,
  type GenreType,
  type MovieType,
  type TVType,
};
