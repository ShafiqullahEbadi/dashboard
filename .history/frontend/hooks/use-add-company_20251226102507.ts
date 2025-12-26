import { axiosInstance } from "@/lib/api-services"
import { useMutation, useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return useMutation({
        queryFn: () => {
            return axiosInstance
                        .get('/companies')
                        .then(res => res.data)                    
        }
    })    
}

export default useAddCompany