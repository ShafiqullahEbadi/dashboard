import { axiosInstance } from "@/lib/api-services"
import { useMutation, useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return useMutation({
        mutationFn: () => {
            return axiosInstance
                        .get('/companies')
                        .then(res => res.data)                    
        }
    })    
}

export default useAddCompany