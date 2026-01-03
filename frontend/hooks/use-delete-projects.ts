import { axiosInstance } from "@/lib/api-services"
import { useMutation } from "@tanstack/react-query"

const useDeleteProject = () => {
    return useMutation({
        mutationFn: (projectId: string) => {
            return axiosInstance
                .delete(`project/${projectId}`)
                .then((res) => res.data)
        }
    })
}

export default useDeleteProject