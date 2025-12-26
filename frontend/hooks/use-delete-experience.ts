import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useDeleteExperience = () => {
  return useMutation({
    mutationFn: (experienceId: string) => {
      return axiosInstance
        .delete(`experience/${experienceId}`)
        .then((res) => res.data);
    },
  });
};

export default useDeleteExperience;
