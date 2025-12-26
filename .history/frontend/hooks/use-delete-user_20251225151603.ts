import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useDeleteUser = () => {
    return useMutation({
        mutationFn: (reelId: string) => {
            return axiosInstance
                .delete(`/reel/${reelId}`)
                .then((res) => res.data);
        }
    })
}

export default useDeleteUser;