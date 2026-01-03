import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useLogout = () => {
    return useMutation({
        mutationFn: () => {
            return axiosInstance
                .post('auth/logout')
                .then(res => res.data)
        }
    })
}

export default useLogout