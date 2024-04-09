import { useQuery } from "@tanstack/react-query";
import { pathKeys } from "../../pages/medical/config/path";
import { authorizationHeader } from "../session";

export function useApprovalMutation() { }

async function getAllApprovalsRequest(): Promise<any> {
    const response = await fetch(pathKeys.patient.selfRegister(), {
        method: 'GET',
        headers: {
            ...authorizationHeader()
        }
    }).catch((error) => {
        throw error;
    });
    if (!response.ok) {
        throw new Error('Get All Approvals Failed: ' + response.text);
    }
    const data = await response.json();
    return data;

}

export function useGetAllApprovalsQuery() {
    return useQuery({
        queryKey: ['getAllApprovals'],
        queryFn: () => getAllApprovalsRequest(),
    })
}