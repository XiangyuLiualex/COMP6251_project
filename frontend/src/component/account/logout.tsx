import { sessionStore } from "../store"

const logoutMutation = () => sessionStore.getState().updateToken(null);

export function Logout() {
    return (
        <button onClick={logoutMutation}>Logout</button>
    )
}