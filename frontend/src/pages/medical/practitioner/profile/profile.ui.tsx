import { sessionStore } from "../../../../entities/session";

export function ProfilePage() {
    const id = sessionStore.getState().uid;
    const role = sessionStore.getState().role;
    const token = sessionStore.getState().token;
    return (
        <div>
            <h1>Profile</h1>
            <div> id:{id}</div>
            <div> role:{role}</div>
            <div> token:{token}</div>
        </div>
    )
}