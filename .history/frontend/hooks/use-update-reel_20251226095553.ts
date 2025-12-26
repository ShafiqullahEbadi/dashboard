import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";
import { reelData } from "./use-add-reel";

const useUpdateReel = () => {
  return useMutation({
    mutationFn: ({
      reelId,
      reelData,
    }: {
      reelId: string;
      reelData: Partial<reelData>;
    }) => {
      const formData = new FormData();
      if (reelData.title) formData.append("title", reelData.title);
      if (reelData.video) formData.append("reel", reelData.video);

      return axiosInstance
        .put(`/reel/${reelId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useUpdateReel;
