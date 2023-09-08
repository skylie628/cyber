import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInMutationFn } from "../mutations";
const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signInMutationFn,
    onSuccess: () => {
      //force profile to refetch when there is a mutation
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
export { useSignInMutation };
