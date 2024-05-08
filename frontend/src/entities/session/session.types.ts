export type Role = "patient" | "admin" | "gp";
export type ifPatientValid = boolean;

export type Token = string;

export type State = {
  token: Token | null;
  role: Role | null;
  uid: string;
  name: string;
}

export type Actions = {
  updateToken: (token: Token | null) => void;
}

export type sessionState = State & Actions;

export type UserCredential = {
  token: string;
  email: string;
  id: string;
  role: Role;
  name: string;
}
