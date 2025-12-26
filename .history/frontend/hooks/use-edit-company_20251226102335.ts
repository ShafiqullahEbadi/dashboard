import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useEditCompany = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return axiosInstance
                        .put(`/companies/${data.id}`, data)
                        .then(res => res.data)
        }
    })    
}

export default useEditCompany