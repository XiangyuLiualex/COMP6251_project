import { useQuery } from "@tanstack/react-query";

export function Profile() {
    const getProfile = async () => {
        const response = await fetch('/api/profile');
        return response.json();
    }

    useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}