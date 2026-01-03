import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

export type ReelCreateData = {
  title: string;
  video: File;
  thumbnail: File;
  description: string;
};

const useAddReel = () => {
  return useMutation({
    mutationFn: (data: ReelCreateData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("reel", data.video);
      formData.append("thumbnail", data.thumbnail);

      return axiosInstance.post("/reel", formData).then(res => res.data);
    },
  });
};

export default useAddReel;