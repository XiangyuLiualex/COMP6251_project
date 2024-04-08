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

export type UserCredential = {
  accessToken: string;
  user: {
    // todo remove createAt when backend build
    createdAt: string;
    email: string;
    id: string;
    role?: Role;
  };
}
