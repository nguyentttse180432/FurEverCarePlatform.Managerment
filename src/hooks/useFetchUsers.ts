import { useQuery } from "@tanstack/react-query";
import { IUser } from "../models/IUser";
import { fetchUsers } from "../services/api";

const useFetchUsers = () => {
  return useQuery<IUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers
  })
}

export default useFetchUsers;