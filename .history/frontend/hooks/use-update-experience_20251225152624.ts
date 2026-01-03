import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

interface EditExperienceVariable {
  experience: Partial<Experience> | any;
  selectedExperience: Experience;
}

const useUpdateTeam = () => {
  return useMutation({
    mutationFn: ({ teamMember, selectedMember }: EditTeamVariable) => {
      // if teamMember is FormData (contains file), axios will set appropriate headers
      return axiosInstance.put(`/team/${selectedMember._id}`, teamMember);
    },
  });
};

export default useUpdateTeam;
