import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addStore } from "../../services/store.service";
import { IStore } from "../../types/IStore";

const useAddStore = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (store: IStore) => addStore(store),
    onSuccess: (store: IStore) => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      navigate("/stores", { replace: true });
    },
  });
};
