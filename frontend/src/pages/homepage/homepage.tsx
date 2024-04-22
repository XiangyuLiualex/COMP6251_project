import logo from './logo.svg';
import './homepage.css';
import { Box, AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '../medical/config/path';

// todo: make header bar responsive 
// https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
function Header() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LocalHospitalIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        G4 Health Practice

                    </Typography>
                    <Button color="inherit" onClick={() => navigate(pathKeys.login())}>Login</Button>

                    <Button color="inherit" onClick={() => navigate(pathKeys.signUp())}>Sign up</Button>
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

function body() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )

}

export default function Homepage() {
    return (
        <div>
            <Header />
            {body()}
            <Footer />
        </div>
    );

}
