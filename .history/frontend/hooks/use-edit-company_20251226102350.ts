import { axiosInstance } from "@/lib/api-services"
import { Company } from "@/types/company"
import { useMutation } from "@tanstack/react-query"

const useEditCompany = () => {
    return useMutation({
        mutationFn: (data: Company) => {
            return axiosInstance
                        .put(`/companies/${data.id}`, data)
                        .then(res => res.data)
        }
    })    
}

export default useEditCompany