import { Box, Container, CssBaseline, Link, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { SideBar } from "./SideBar";
import { GenericLayoutProps } from "../config/navigation";

//ref from https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/integrations/routing/ListRouter.tsx
// https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function GenericLayout(config: GenericLayoutProps) {

    const [open, setOpen] = useState(true);
    function toggleDrawer() {
        setOpen(!open);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header role={config.role} open={open} toggleDrawer={toggleDrawer} />
            <SideBar role={config.role} open={open} toggleDrawer={toggleDrawer} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>)
}
