import { axiosInstance } from "@/lib/api-services";
import { Project } from "@/types/project";
import { useMutation } from "@tanstack/react-query";

const useAddProject = () => {
  return useMutation({
    mutationFn: (projectData: any) => {
      // projectData can be FormData (when an image is included) or a plain object
      return axiosInstance
        .post("/project", projectData)
        .then((res) => res.data);
    },
  });
};

export default useAddProject;
