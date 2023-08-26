import { serverClient } from "../../lib/serverClient";
import { UserQueryResponse } from "./type";
const getUser = async () => {
  return UserQueryResponse.parse(
    (await serverClient.get("/api/v1/user/")).data
  );
};
const getUserQuery = () => {
  return {
    queryKey: ["profile"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: false,
    suspense: true,
    useErrorBoundary: true,
  };
};
export { getUserQuery };
