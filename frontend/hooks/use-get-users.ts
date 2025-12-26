"use client"

import { axiosInstance } from "@/lib/api-services"
import { useQuery } from "@tanstack/react-query"

const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return axiosInstance
                .get('/users')
                .then(res => res.data)
        }
    })
}

export default useGetUsers