import { axiosInstance } from "@/lib/api-services";
import { TeamMember } from "@/types/team";
import { useMutation } from "@tanstack/react-query";

const useAddExperience = () => {
  return useMutation<TeamMember, Error, TeamMember>({
    mutationFn: (experienceData) => {
      return axiosInstance
        .post("/experience", experienceData)
        .then((res) => res.data);
    },
  });
};

export default useAddExperience;
