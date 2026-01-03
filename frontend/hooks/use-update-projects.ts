import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useUpdateProject = () => {
  return useMutation({
    mutationFn: ({
      projectData,
      projectId,
    }: {
      projectData: any;
      projectId: string;
    }) => {
      return axiosInstance
        .put(`/project/${projectId}`, projectData)
        .then((res) => res.data);
    },
  });
};

export default useUpdateProject;
