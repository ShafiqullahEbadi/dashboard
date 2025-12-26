import { useQuery } from "@tanstack/react-query"

const useAddCompany = () => {
    return useQuery({
        queryKey: ['companies'],
        
    })    
}