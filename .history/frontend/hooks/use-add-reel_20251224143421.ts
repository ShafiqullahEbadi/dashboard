import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

type reelData = {
  title: string;
  
};

const useAddReel = () => {
  return useMutation({
    mutationFn: (reelData: ContactMessagePayload) => {
      return axiosInstance
        .post("/message", messageData)
        .then((res) => res.data);
    },
  });
};

export default useAddReel;
