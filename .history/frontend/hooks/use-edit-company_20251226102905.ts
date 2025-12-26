import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useEditCompany = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; logo?: File };
    }) => {
      const formData = new FormData();
      if (data.name) formData.append("company_name", data.name);
      if (data.logo) formData.append("logo", data.logo);

      return axiosInstance
        .put(`/companies/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useEditCompany;
