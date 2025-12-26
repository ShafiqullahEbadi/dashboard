import { axiosInstance } from "@/lib/api-services";
import { useMutation } from "@tanstack/react-query";

const useUpdateReel = () => {
    return useMutation({
        mutationFn: (reelId: string, reelData: reelData) => {
            return axiosInstance
                .put(`/reel/${reelId}`, reelData)
                .then((res) => res.data);
        }
    })
}

export default useUpdateReel;