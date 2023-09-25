import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShowMutationFn } from "../mutations";
const useUpdateShowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShowMutationFn,
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["show"] });
    },
  });
};
export { useUpdateShowMutation };
