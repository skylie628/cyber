import { useQuery } from "@tanstack/react-query";
import { getMultipleShowsQuery } from "../queries";
import { MultipleShowsQueryResponseType } from "../type";

const useGetMultipleShowsQuery = (query?: string) => {
  const response = useQuery<MultipleShowsQueryResponseType>({
    ...getMultipleShowsQuery(),
  });
  const { error, isLoading } = response;
  let data = response.data;
  if (query !== "") {
    data = data?.filter((media: any) =>
      media.title
        ? media.title.match(new RegExp(query!, "i"))
        : media.name?.match(new RegExp(query!, "i"))
    );
  }
  return { data, error, isLoading };
};

export { useGetMultipleShowsQuery };
