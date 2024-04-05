import { QueryClient, QueryClientProvider as TankQueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// nested components props
// https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
export function QueryClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <TankQueryClientProvider client={queryClient}>
            {children}
        </TankQueryClientProvider>
    )
}