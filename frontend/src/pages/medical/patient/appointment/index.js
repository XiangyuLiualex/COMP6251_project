import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppointmentPage} from "./appointment.ui";
export * from './appointment.route'
const queryClient = new QueryClient();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<QueryClientProvider client={queryClient}>
    <AppointmentPage />
</QueryClientProvider>
);
