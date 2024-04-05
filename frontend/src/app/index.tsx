import React from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { RoutesProvider } from "./RoutesProvider";

export function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider>
                <RoutesProvider />
            </QueryClientProvider>
        </React.StrictMode>
    )
}