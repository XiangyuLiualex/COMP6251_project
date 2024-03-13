import { useQuery } from "@tanstack/react-query";

export default function Profile() {
    const getProfile = async () => {
        const response = await fetch('/api/profile');
        return response.json();
    }
    
    useQuery({
        queryKey:['profile'],
        queryFn: getProfile
    })
}