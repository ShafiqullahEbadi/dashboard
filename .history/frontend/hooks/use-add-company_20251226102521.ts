import { axiosInstance } from "@/lib/api-services"
import { useMutation, useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return useMutation({
        mutationFn: () => {
            return axiosInstance
                        .post('/companies')
                        .then(res => res.data)                    
        }
    })    
}

export default useAddCompany