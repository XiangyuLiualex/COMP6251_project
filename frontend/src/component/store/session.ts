import { PersistOptions, persist,devtools } from 'zustand/middleware';
import { StateCreator, createStore } from "zustand";
import { sessionState } from './session.types';

// zustand example:
// https://doichevkostia.dev/blog/authentication-store-with-zustand/
// https://github.com/yurisldk/realworld-react-fsd/blob/master/src/entities/session/session.model.ts#L35


const createSessionSlice:StateCreator<sessionState,[],[],sessionState> = (set) => ({
    token: null,
    role: null,
    updateToken: (token: string|null) => set({token: token || null, }),
})

const persistConfig : PersistOptions<sessionState> = { name: 'session'};
const devtoolsConfig = { name: 'sessionStore'};

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