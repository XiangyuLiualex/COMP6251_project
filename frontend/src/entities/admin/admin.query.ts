import { useMutation, useQuery } from "@tanstack/react-query";
import { pathKeys } from "../../pages/medical/config/path";
import { authorizationHeader } from "../session";
import { SelfRegisterData_forReceive, SelfRegisterData_forSubmit } from "../patient/patient.query";
import { useSnackbar } from 'notistack';

export function useApprovalMutation() { }

async function getAllApprovalsRequest(): Promise<any> {
    const response = await fetch(pathKeys.admin.apiGetAllApprovals(), {
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
    return useQuery<SelfRegisterData_forReceive[], Error>({
        queryKey: ['getAllApprovals'],
        queryFn: () => getAllApprovalsRequest(),
    })
}

async function approveSelfRegisterRequest(patientId: string): Promise<any> {
    const response = await fetch(pathKeys.admin.apiApproveSelfRegister(patientId), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader()
        },
        body: JSON.stringify({ status: "approved" })
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Approve Self Register Failed: ' + response.text);
        }
        return response.json();
    }).catch((error) => {
        throw error;
    });
    if (!response.ok) {
        throw new Error('Approve Self Register Failed: ' + response.text);
    }
    console.log("I approved")
    return response.json();
}

export function useApproveSelfRegisterMutation() {
    const { enqueueSnackbar } = useSnackbar();
    return useMutation({
        mutationFn: (patientId: string) => approveSelfRegisterRequest(patientId),
        // todo handle success and error feedback
        onSuccess: (data) => {
            enqueueSnackbar('Approve Self Register Successful!', { variant: 'success', autoHideDuration: 2000 });
            console.log('Approve Self Register Success:', data);
        },
        onError: (error) => {
            enqueueSnackbar('Approve Self Register Successful!', { variant: 'success', autoHideDuration: 3500 });
            console.error('Approve Self Register Failed:', error);
        }
    });

}