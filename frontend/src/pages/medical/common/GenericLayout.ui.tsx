import { AppBar, Box, List, ListItem, ListItemIcon, ListItemText, Paper, Toolbar } from "@mui/material";
import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps, } from "react-router-dom";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

//ref from https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/integrations/routing/ListRouter.tsx
interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
    function Link(itemProps, ref) {
        return <RouterLink ref={ref} {...itemProps} role={undefined} />;
    },
);

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    return (
        <li>
            <ListItem button component={Link} to={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

function SideNavigation() {
    return (
        <Box sx={{ width: 360, bgcolor: 'primary.main' }}>
            <Paper elevation={0}>
                <List aria-label="main mailbox folders">
                    <ListItemLink to="/patient/profile" primary="Inbox" />
                    <ListItemLink to="/drafts" primary="Drafts" />
                    <ListItemLink to="/trash" primary="Trash" />
                    <ListItemLink to="/spam" primary="Spam" />
                </List>
            </Paper>
        </Box>
    )
}

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

function Footer() {
    return (
        <footer>
            <p>Footer</p>
        </footer>
    )
}

export function MedicalGenericLayout() {
    return (
        <>
            <Header />
            <SideNavigation />
        </>
    )

}