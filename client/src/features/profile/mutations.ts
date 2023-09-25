import { serverClient } from "@/lib/serverClient";
import { ShowUpdateFormType } from "./type";
const deleteShow = (id: string) => {
  serverClient.delete(`/api/v1/user/${id}`);
};
const updateShow = (id: string, payload: ShowUpdateFormType) => {
  return serverClient.put(`/api/v1/show/${id}`, payload);
};
const deleteShowMutationFn = (id: string) => deleteShow(id);
const updateShowMutationFn = ({
  id,
  payload,
}: {
  id: string;
  payload: ShowUpdateFormType;
}) => updateShow(id, payload);
export { deleteShowMutationFn, updateShowMutationFn };
