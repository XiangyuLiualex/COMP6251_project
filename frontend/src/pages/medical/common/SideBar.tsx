import { Box, Divider, Grid, IconButton, Toolbar, Typography, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { NavLists } from './naviList';
import { Role } from '../../../entities/session/session.types';


export const drawerWidth: number = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export function SideBar({ role, open, toggleDrawer }: { role: Role, open: boolean, toggleDrawer: () => void }) {
    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <LocalHospitalIcon />
                    <Typography variant="h6" noWrap component="div">
                        Service
                    </Typography>
                </Box>


                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />

            <NavLists role={role} />
        </Drawer>
    )
}
