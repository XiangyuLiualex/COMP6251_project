import { sessionStore } from "../../entities/session"

const logoutMutation = () => sessionStore.getState().updateToken(null);

export function Logout() {
    return (
        <button onClick={logoutMutation}>Logout</button>
    )
}