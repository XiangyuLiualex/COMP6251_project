import React from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { RoutesProvider } from "./RoutesProvider";
import { SnackbarProvider } from 'notistack';


export function App() {
    return (
        <React.StrictMode>
            <SnackbarProvider >
                <QueryClientProvider>
                    <RoutesProvider />
                </QueryClientProvider>
            </SnackbarProvider>
        </React.StrictMode>
    )
}