import { axiosInstance } from "@/lib/api-services";
import { TeamMember } from "@/types/team";
import { useMutation } from "@tanstack/react-query";

const useAddTeam = () => {
  return useMutation<TeamMember, Error, TeamMember>({
    mutationFn: (teamMemberData) => {
      // Accept either plain object or FormData (for image uploads)
      return axiosInstance
        .post("/team", teamMemberData)
        .then((res) => res.data);
    },
  });
};

export default useAddTeam;
