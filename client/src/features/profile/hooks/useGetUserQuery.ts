import { useQuery } from "@tanstack/react-query";
import { getUserQuery } from "../../searching/queries";
import { UserQueryResponseType } from "../type";

const useGetUserQuery = () => {
  console.log("useGetUserQuery", getUserQuery());
  const { data, error, isLoading } = useQuery<UserQueryResponseType>({
    ...getUserQuery(),
  });
  return { data, error, isLoading };
};
export { useGetUserQuery };
