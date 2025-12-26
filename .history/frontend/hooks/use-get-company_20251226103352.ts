import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useGetCompany = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => {
            return axiosInstance
                        .get('/company')
                        .then(res => res.data)
        }
    })
}

export default useGetCompany;