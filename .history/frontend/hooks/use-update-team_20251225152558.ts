import { axiosInstance } from "@/lib/api-services";
import { TeamMember } from "@/types/experiece";
import { useMutation } from "@tanstack/react-query";

interface EditTeamVariable {
  teamMember: Partial<TeamMember> | any;
  selectedMember: TeamMember;
}

const useUpdateTeam = () => {
  return useMutation({
    mutationFn: ({ teamMember, select edMember }: EditTeamVariable) => {
      // if teamMember is FormData (contains file), axios will set appropriate headers
      return axiosInstance.put(`/team/${selectedMember._id}`, teamMember);
    },
  });
};

export default useUpdateTeam;
