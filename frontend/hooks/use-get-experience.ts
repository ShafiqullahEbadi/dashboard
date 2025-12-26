import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useGetExperience = () => {
    return useQuery({
        queryKey: ["experience"],
        queryFn: () => {
            return axiosInstance
                .get('/experience')
                .then(res => res.data)
        }
    })
}

export default useGetExperience