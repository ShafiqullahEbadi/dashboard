import { axiosInstance } from "@/lib/api-services";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

const useSignUp = () => {
  return useMutation<User, Error, User>({
    mutationFn: (signupData: User) => {
      return axiosInstance
        .post("auth/signup", signupData)
        .then((res) => res.data);
    },
  });
};

export default useSignUp;
