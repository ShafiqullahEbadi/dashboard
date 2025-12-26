import { axiosInstance } from "@/lib/api-services";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      return axiosInstance.get("/auth/me").then((res) => res.data);
    },
  });
};

export default useAuth;
