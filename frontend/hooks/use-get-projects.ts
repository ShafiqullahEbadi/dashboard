import { axiosInstance } from "@/lib/api-services";
import { useQuery } from '@tanstack/react-query';

const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => {
      return axiosInstance.get("/project").then((res) => res.data);
    },
  });
};

export default useGetProjects;
