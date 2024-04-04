export type Role = "patient" | "admin" | "gp";

export type Token = string ;

export type State ={
    token : Token | null;
    role: Role | null;
}

export type Actions = {
    updateToken : (token : Token|null) => void;
}

export type sessionState = State & Actions;
