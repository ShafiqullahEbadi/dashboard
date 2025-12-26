import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useAddReel = () => {
    useMutation({
        mutationFn: () => {
            return axios
        }
    })
}