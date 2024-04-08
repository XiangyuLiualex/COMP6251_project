import { useMutation } from "@tanstack/react-query";

function selfRegisterRequest() {
    return fetch('http://localhost:5000/api/self-register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        })  }).then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
    }
    );
}

export function useSelfRegisterMutation() {
    return useMutation({
        mutationFn: selfRegisterRequest,
        onSuccess: () => { }
    })
}