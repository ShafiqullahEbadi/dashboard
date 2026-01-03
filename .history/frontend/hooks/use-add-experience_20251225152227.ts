import { axiosInstance } from "@/lib/api-services";
import { TeamMember } from "@/types/team";
import { useMutation } from "@tanstack/react-query";

const useAddExperience = () => {
  return useMutation<TeamMember, Error, TeamMember>({
    mutationFn: (teamMemberData) => {
      return axiosInstance
        .post("/team", teamMemberData)
        .then((res) => res.data);
    },
  });
};

export default useAddExperience;
