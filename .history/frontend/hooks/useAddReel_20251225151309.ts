import { useMutation } from "@tanstack/react-query"

export const useAddReel = () => {
    useMutation({
        mutationFn: () => {
            return axios
        }
    })
}