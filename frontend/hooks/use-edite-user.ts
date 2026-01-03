import { axiosInstance } from "@/lib/api-services";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

type EditUserVariables = {
  editedData: Partial<User> | any;
  selectedUser: User;
};

const useEditUser = () => {
  return useMutation({
    mutationFn: ({ editedData, selectedUser }: EditUserVariables) => {
      return axiosInstance
        .put(`users/${selectedUser._id}`, editedData)
        .then((res) => res.data);
    },
  });
};

export default useEditUser;
