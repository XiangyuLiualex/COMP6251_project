import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerWidth } from './SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { Role } from '../../../entities/session/session.types';
import { useLogoutMutation } from '../../../entities/session';
import { useState } from 'react';
import axios from 'axios';
import { apiPrefix, pathKeys } from '../config/path';
import { authorizationHeader } from '../../../entities/session';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Navigate, useNavigate } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export function Header({ role, open, toggleDrawer }: { role: Role, open: boolean, toggleDrawer: () => void }) {
    const [notiNum, setNotiNum] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, data } = useQuery({
        queryKey: ['tests-notification'],
        queryFn: async () => {
            const { data } = await axios.get(
                apiPrefix("/test/notification"),
                {
                    headers: {
                        ...authorizationHeader()
                    },
                }
            );
            if (data.length !== notiNum) {
                setNotiNum(data.length);
                enqueueSnackbar('You have tests to do!', { variant: 'info', autoHideDuration: 10000 });
            }
            return data;
        },
        refetchInterval: 60 * 1000,
        refetchIntervalInBackground: true
    });

    const navigate = useNavigate();
    function handleGetNotification() {
        navigate(pathKeys.patient.tests())
    }

    const { mutate: logout } = useLogoutMutation();
    function handleLogout() {
        logout();
    }
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {role.toUpperCase()} PAGE
                </Typography>
                <IconButton color="inherit">
                    {/* TODO: add function here */}
                    <Badge badgeContent={notiNum} color="secondary" onClick={handleGetNotification}>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>


    )
}
