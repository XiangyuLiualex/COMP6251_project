import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";
import { authorizationHeader, sessionStore } from "../session";
import { pathKeys } from "../../pages/medical/config/path";

async function medicalHistoryFormRequest(data: any) {
    const response = await fetch(pathKeys.apiHistory(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authorizationHeader(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Medical History Form Failed: " + await response.text());
    }

    return await response.json();
}

export function useMedicalHistoryMutation() {
    return useMutation<any, DefaultError, any, unknown>({
        mutationFn: (data) => medicalHistoryFormRequest(data),
        onSuccess: (data) => {
            console.log("Medical history form submit: ", data);
        },
        onError: (error: DefaultError) => {
            console.error("Error submitting medical history form: ", error);
        }
    });
}
