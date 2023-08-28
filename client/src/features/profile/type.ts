import { z } from "zod";

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
const MultipleShowsQueryResponse = z.array(ShowQueryResponse);
type ShowQueryResponseType = z.infer<typeof ShowQueryResponse>;
type MultipleShowsQueryResponseType = z.infer<
  typeof MultipleShowsQueryResponse
>;
type UserQueryResponseType = z.infer<typeof UserQueryResponse>;
export {
  UserQueryResponse,
  type UserQueryResponseType,
  ShowQueryResponse,
  type ShowQueryResponseType,
  MultipleShowsQueryResponse,
  type MultipleShowsQueryResponseType,
};
