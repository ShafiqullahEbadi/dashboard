import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useDeleteCompany = () => {
    return useMutation({
        mutationFn: (id: string) => {
            return axiosInstance
                        .delete(`/company/${id}`)
                        .then(res => res.data)
        }
    })   
}

export default useDeleteCompany;