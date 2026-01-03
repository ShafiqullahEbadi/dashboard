import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useUpdateReel = () => {
  return useMutation({
    mutationFn: ({
      reelId,
      reelData,
    }: {
      reelId: string;
      reelData: {
        title?: string;
        description?: string;
        video?: File;
        thumbnail?: File;
      };
    }) => {
      const formData = new FormData();
      if (reelData.title) formData.append("title", reelData.title);
      if (reelData.description) formData.append("description", reelData.description);
      if (reelData.video) formData.append("reel", reelData.video);
      if (reelData.thumbnail)
        formData.append("thumbnail", reelData.thumbnail);

      return axiosInstance
        .put(`/reel/${reelId}`, formData)
        .then(res => res.data);
    },
  });
};

export default useUpdateReel;