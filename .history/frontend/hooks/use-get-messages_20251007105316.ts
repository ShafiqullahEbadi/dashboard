import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useGetMessages = () => {
    return useQuery({
        queryKey: ['messages'],
        queryFn: () => {
            return axiosInstance
                .get('/message')
                .then(res => res.data)
        }
    })
}

export default useGetMessages;