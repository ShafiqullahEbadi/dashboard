import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

export type reelData = {
  title: string;
  video: File;
};

const useAddReel = () => {
  return useMutation({
    mutationFn: (reelData: reelData) => {
      const formData = new FormData();
      formData.append("title", reelData.title);
      formData.append("reel", reelData.video);

      return axiosInstance
        .post("/reel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useAddReel;
