import { z } from "zod";
const GenreSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
const GenreListSchema = z.object({
  genres: z.array(GenreSchema),
});
type GenreType = z.infer<typeof GenreSchema>;
export { GenreListSchema, type GenreType };
