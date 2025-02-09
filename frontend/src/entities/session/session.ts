import { PersistOptions, persist, devtools } from 'zustand/middleware';
import { StateCreator, createStore } from "zustand";
import { Role, UserCredential, sessionState } from './session.types';
import { useNavigate } from 'react-router-dom';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { apiPrefix, pathKeys } from '../../pages/medical/config/path';

type LoginForm = {
  email: string;
  password: string;
}

// zustand example:
// https://doichevkostia.dev/blog/authentication-store-with-zustand/
// https://github.com/yurisldk/realworld-react-fsd/blob/master/src/entities/session/session.model.ts#L35
async function loginRequest(params: LoginForm): Promise<UserCredential> {
  const response = await fetch(pathKeys.apiLogin(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .catch((error) => {
      console.error("Login Network Failed:", error);
      throw error;
    });
  if (!response.ok) {
    throw new Error("Login Failed: " + response.text);
  }
  const data = await response.json();

  return data;
}



//todo refactor mutation and redirect path
function roleBasedRedirect(role: Role): string {
  switch (role) {
    case "admin":
      return "/admin";


    // todo gp page not yet build
    case "gp":
      return pathKeys.practitioner.gp.root();

    case "patient":
      return "/patient";

    default:
      return "/patient";
  }
}

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation<
    UserCredential,
    DefaultError,
    {
      email: string; password: string
    },
    unknown
  >({
    mutationFn: ({ email, password }) => loginRequest({ email, password }),
    onSuccess: async (data) => {
      sessionStore.setState({
        token: data.token, role: data.role.toLocaleLowerCase() as Role, uid: data.id
        , name: data.name
      })

      navigate(roleBasedRedirect(data.role.toLocaleLowerCase() as Role));
      console.log("login success", data.role);
    },
    onError: (error) => {
      console.error("login error", error);
    }
  });

}


// ---------------------------- store --------------------------------------

const createSessionSlice: StateCreator<sessionState, [], [], sessionState> = (set) => ({
  token: null,
  role: null,
  uid: "",
  name: "",
  updateToken: (token: string | null) => set({ token: token || null, }),
})

const persistConfig: PersistOptions<sessionState> = { name: 'session' };
const devtoolsConfig = { name: 'sessionStore' };

export const sessionStore = createStore<sessionState>()(
  devtools(
    persist(createSessionSlice, persistConfig),
    devtoolsConfig
  )
)

export const hasToken = () => Boolean(sessionStore.getState().token);

export function authorizationHeader() {
  if (hasToken()) {
    return { Authorization: `Bearer ${sessionStore.getState().token}` };
  }
}
export function useLogoutMutation() {
  const navigate = useNavigate();
  return useMutation({
    onSettled: () => {
      sessionStore.getState().updateToken(null);
      navigate("/")
    }
  })
}