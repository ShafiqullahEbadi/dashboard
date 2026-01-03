import { axiosInstance } from "@/lib/api-services";
import { Experience } from "@/types/experiece";
import { useMutation } from "@tanstack/react-query";

interface EditExperienceVariable {
  experience: Partial<Experience> | any;
  selectedExperience: Experience;
}

const useUpdateExperience = () => {
  return useMutation({
    mutationFn: ({ experience, selectedExperience }: EditExperienceVariable) => {
      // if teamMember is FormData (contains file), axios will set appropriate headers
      return axiosInstance.put(`/experience/${selectedExperience._id}`, experience);
    },
  });
};

export default useUpdateExperience;
