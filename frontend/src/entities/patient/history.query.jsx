import { pathKeys } from "../../pages/medical/config/path";
import { authorizationHeader } from "../session";
import { useQuery } from '@tanstack/react-query';



export function useHistoryQuery(id) {
    console.log("useHistoryQuery id:", id)
    return useQuery({
        queryKey: ['history', id],
        queryFn: async () => {
            console.log("getHistory id:", id)
            const response = await fetch(pathKeys.apiGetHistory(id), {
                method: "GET",
                headers: {
                    ...authorizationHeader(),
                }
            }).catch((error) => {
                console.error("Login Network Failed:", error);
                throw error;
            });

            if (!response.ok) {
                throw new Error("Login Failed: " + response.text);
            }
            return await response.json();
        }
    })
}