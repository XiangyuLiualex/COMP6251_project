import { useMutation } from "@tanstack/react-query";
import { UserCredential } from "../session/session.types";
import { useNavigate } from "react-router-dom";
import { sessionStore } from "../session";
import { pathKeys } from "../../pages/medical/config/path";

export type SignUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

async function signUpRequest(signUpForm: SignUpForm): Promise<UserCredential> {
    // todo fetch can be extracted to a common function
    const response = await fetch(pathKeys.signUp(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
    }).catch((error) => {
        console.error("Sign Up Network Failed:", error);
        throw error;
    });

    if (!response.ok) {
        throw new Error("Request Failed, signUp : " + (await response.text()));
    }

    const data = await response.json();

    return data;
}

// patient create account, redirect to patient page
export function useSignUpMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (signUpForm: SignUpForm) => signUpRequest(signUpForm),
        onSuccess: (data) => {
            sessionStore.setState({ token: data.accessToken, role: "patient" });
            navigate("/patient");
        },
        onError: (error) => {
            console.error("Sign Up Failed:", error);
        },
    });
}
