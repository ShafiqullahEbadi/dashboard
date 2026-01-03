import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useDeleteUser = () => {
    return useMutation({
        mutationFn: (userId: string) => {
            return axiosInstance
                .delete(`/users/${userId}`)
                .then((res) => res.data);
        }
    })
}

export default useDeleteUser;