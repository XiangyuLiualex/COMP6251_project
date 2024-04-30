import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";
import { authorizationHeader, sessionStore } from "../session";
import { pathKeys } from "../../pages/medical/config/path";
import { GridRowsProp } from "@mui/x-data-grid";
import { selfRegiForm } from "../../pages/medical/patient/selfRegister/form.tsx";
import {randomId} from "@mui/x-data-grid-generator";

export type SelfRegisterData_forSubmit = {
    patientId: string;
    createDateTimeString: string;
    // todo type this
    formData: selfRegiForm;
    // todo backend stage remove it
    statues: string;
};
export type SelfRegisterData_forReceive = SelfRegisterData_forSubmit & {
    id: string;
};

function handleRequestData(form: any) {
    const createTime = new Date().toDateString();
    const statues = "created";
    const data: SelfRegisterData_forSubmit = {
        patientId: sessionStore.getState().uid,
        createDateTimeString: createTime,
        formData: form,
        statues: statues,
    };

    return JSON.stringify(data);
}

async function selfRegisterFormRequest(form: any) {
    const response = await fetch(pathKeys.patient.apiSelfRegister(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authorizationHeader(),
        },
        body: handleRequestData(form),
    }).catch((error) => {
        throw error;
    });
    if (!response.ok) {
        throw new Error("Self Register Form Failed: " + response.text);
    }
    const data = await response.json();
    return data;
}

export function useSelfRegisterFormMutation() {
    return useMutation<any, DefaultError, any, unknown>({
        mutationFn: (form) => selfRegisterFormRequest(form),
        onSuccess: async (data) => {
            console.log("self register form submit: ", data);
        },
    });
}

type GuestCheckData = {
    id: number;
    patientId: number;
    ifPatientValid: string;
};

// TODO backend return exist or not
export function UseGuestCheck() {
    const currentUId = sessionStore.getState().uid;

    const fn = wrappedFetch({
        url: pathKeys.patient.apiGuestCheck().concat("/" + currentUId),
        method: "GET",
    });

    return useQuery<GuestCheckData>({
        queryKey: ["guestCheck"],
        queryFn: () => fn,
    });
}

type WrappedConfig = {
    url: string;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    body?: any;
};

function buildHeader(config: WrappedConfig) {
    var header: {};
    switch (config.method) {
        case "POST":
            header = {
                "Content-Type": "application/json",
                ...authorizationHeader(),
            };
            break;
        case "GET":
            header = {
                ...authorizationHeader(),
            };
            break;
        case "PUT":
            header = {
                "Content-Type": "application/json",
                ...authorizationHeader(),
            };
            break;
        case "DELETE":
            header = {
                ...authorizationHeader(),
            };
            break;
        case "PATCH":
            header = {
                "Content-Type": "application/json",
                ...authorizationHeader(),
            };
            break;
        default:
            throw new Error("Method not found");
    }
    return header;
}

// todo refine error handling
function handleErrorResponse(response: Response) {
    if (!response.ok) {
        throw new Error("Request Failed: " + response.text);
    }
}

async function wrappedFetch(config: WrappedConfig) {

    const response = await fetch(config.url, {
        method: config.method,
        headers: buildHeader(config),
        body: config.body,
    }).catch((error) => {
        console.error("Network Failed:", error);
        throw error;
    });

    handleErrorResponse(response);

    var data;
    try {
        data = await response.json();
    } catch (jsonError) {
        throw new Error("Json Parse Failed: " + jsonError);
    }

    return data;
}

// TODO wrap fetch with query
// export type QueryConfig = {
//     fetchConfig: WrappedConfig;
//     queryKey: [string];
//     queryFn: () => any;
// };
// function WrappedQuery<TData, TError, TQueryFnData > (config: QueryConfig) {
//     return useQuery<TData, TError, TQueryFnData>({
//         queryKey: config.queryKey,
//         queryFn: () => wrappedFetch(config.fetchConfig),
//     });

// }
// function WrappedMutation() { }
