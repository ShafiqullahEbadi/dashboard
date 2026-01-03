import { axiosInstance } from "@/lib/api-services";
import { useQuery } from "@tanstack/react-query";

const useGetReel = () => {
  return useQuery({
    queryKey: ["reel"],
    queryFn: () => {
      return axiosInstance
                .get("/reel")
                .then((res) => res.data);
    },
  });
};

export default useGetMessages;
