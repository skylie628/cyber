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
const HomeMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional(),
  total_pages: z.number().optional(),
});
const HomeTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
  total_pages: z.number().optional(),
});
const UserQueryResponse = z.object({
  _id: z.string({ required_error: "Id is not in response" }),
  email: z.string().email("Email is not in response"),
  name: z.string({ required_error: "Name is not in response" }),
  createdAt: z.string({ required_error: "Create date is not in response" }),
  updatedAt: z.string({ required_error: "Update date is not in response" }),
  avatar: z.string().optional(),
});

const ShowQueryResponse = z.object({
  user: z.string({ required_error: "User Id not found." }),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  media_type: z.string().optional(),
  season_number: z.number().optional(),
  id: z.string({ required_error: "Show Id not found" }),
  status: z.string().optional(),
  isFavorited: z.boolean().optional(),
  score: z.number().optional(),
  createdAt: z.string({ required_error: "Create time not found." }),
  updatedAt: z.string({ required_error: "Update time not found." }),
});

const ShowUpdateForm = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  media_type: z.string().optional(),
  season_number: z.number().optional(),
  status: z.string().optional(),
  isFavorited: z.boolean().optional(),
  score: z.number().optional(),
});
const MultipleShowsQueryResponse = z.array(ShowQueryResponse);
type ShowQueryResponseType = z.infer<typeof ShowQueryResponse>;
type MultipleShowsQueryResponseType = z.infer<
  typeof MultipleShowsQueryResponse
>;
type UserQueryResponseType = z.infer<typeof UserQueryResponse>;
type HomeMovieListType = z.infer<typeof HomeMovieList>;
type HomeTVListType = z.infer<typeof HomeTVList>;
type ShowUpdateFormType = z.infer<typeof ShowUpdateForm>;
export {
  type MovieFilterList,
  type TVFilterList,
  HomeMovieList,
  HomeTVList,
  UserQueryResponse,
  type UserQueryResponseType,
  ShowQueryResponse,
  type ShowQueryResponseType,
  MultipleShowsQueryResponse,
  type MultipleShowsQueryResponseType,
  type HomeMovieListType,
  type HomeTVListType,
  type ShowUpdateFormType,
};
