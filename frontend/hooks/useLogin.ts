import { axiosInstance } from "@/lib/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface loginData {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData: loginData) => {
      return axiosInstance
        .post("auth/login", loginData)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push(`/auth/${data.user.fullName}`);
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

export default useLogin;
