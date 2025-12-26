import { useQuery } from "@tanstack/react-query"

const useGetCompany = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => {
            return axiosInstance
                        .get('/companies')
                        .then(res => res.data)
        }
    })
}