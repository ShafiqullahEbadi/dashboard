import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => {
            return axiosInstance
        }
    })    
}