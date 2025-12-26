import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useAddCompany = () => {
  return useMutation({
    mutationFn: (data: { name: string; logo: File }) => {
      const formData = new FormData();
      formData.append("company_name", data.name);
      formData.append("logo", data.logo);

      return axiosInstance
        .post("/companies", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useAddCompany;
