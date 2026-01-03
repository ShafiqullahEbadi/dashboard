import { axiosInstance } from "@/lib/api-services";
import { Experience } from "@/types/experiece";
import { useMutation } from "@tanstack/react-query";

const useAddExperience = () => {
  return useMutation<Experience, Error, Experience>({
    mutationFn: (experienceData) => {
      return axiosInstance
        .post("/experience", experienceData)
        .then((res) => res.data);
    },
  });
};

export default useAddExperience;
