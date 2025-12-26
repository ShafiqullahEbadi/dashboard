import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

type reelData = {
  title: string;
  video: File;
};

const useAddReel = () => {
  return useMutation({
    mutationFn: (reelData: reelData) => {
      return axiosInstance
                  .post("/reel", reelData).then((res) => res.data);
    },
  });
};

export default useAddReel;
