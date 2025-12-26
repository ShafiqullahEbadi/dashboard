import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useDeleteExperience = () => {
  return useMutation({
    mutationFn: (teamMemberId: string) => {
      return axiosInstance
        .delete(`team/${teamMemberId}`)
        .then((res) => res.data);
    },
  });
};

export default useDeleteTeam;
