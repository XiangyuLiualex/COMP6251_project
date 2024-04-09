import { DefaultError, useMutation } from "@tanstack/react-query";
import { authorizationHeader } from "../session";
import { pathKeys } from "../../pages/medical/config/path";

async function selfRegisterFormRequest(form: any){
    const response = await fetch(pathKeys.patient.selfRegister(),{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader()
        },
        body: JSON.stringify(form)
    }).catch((error) => {
        throw error;
    });
    if(!response.ok){
        throw new Error('Self Register Form Failed: ' + response.text);
    }
    const data = await response.json();
    return data;
}

export function useSelfRegisterFormMutation(){
    return useMutation<
        any,
        DefaultError,
        any,
        unknown
    >({
        mutationFn: (form) => selfRegisterFormRequest(form),
        onSuccess: async (data) => {
            console.log(data);
        }
    })
}