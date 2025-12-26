import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return MutationObserver({
        queryKey: ['companies'],
        queryFn: () => {
            return axiosInstance
                        .get('/companies')
                        .then(res => res.data)                    
        }
    })    
}

export default useAddCompany