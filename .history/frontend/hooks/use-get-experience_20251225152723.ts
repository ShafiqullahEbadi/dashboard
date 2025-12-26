import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useTeam = () => {
    return useQuery({
        queryKey: ["expe"],
        queryFn: () => {
            return axiosInstance
                .get('/team')
                .then(res => res.data)
        }
    })
}

export default useTeam