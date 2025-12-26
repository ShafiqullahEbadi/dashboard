import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

export const useAddReel = () => {
    useMutation({
        mutationFn: () => {
            return axiosInstance
                        .get('/reel')
                        .then(res => res.data)
        }
    })
}

