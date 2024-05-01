import logo from './logo.svg';
import './homepage.css';
import { Box, AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '../medical/config/path';
import homepageImage from '../../assets/homepage.jpg';
import React, { useRef } from 'react';


// todo: make header bar responsive
// https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
    function Header() {
        const navigate = useNavigate();

        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <LocalHospitalIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            G4 Health Practice pro
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
                <p>© 2024 G4 Health Practice Pro. All rights reserved</p>
            </footer>
        )
    }

    function body() {
        const descriptionRef = useRef<HTMLDivElement>(null);

        const scrollToDescription = () => {
            descriptionRef.current?.scrollIntoView({behavior: 'smooth'});
        };

        return (

            <div className="App">
                <header className="App-header">
                    {/*<div className="description-container">
                    <p className="description">The G4 Health Practice Pro website is a platform dedicated to providing
                        comprehensive healthcare services.</p>
                </div>*/}
                    <img src={homepageImage} className="App-logo" alt="homepage"
                         style={{width: '100%', height: 'auto'}}/>
                    <div className="overlay">
                        <h1>Welcome to G4 Health <br/> Practice pro </h1>
                        <button onClick={scrollToDescription}>Learn More</button>
                    </div>
                </header>

                <div ref={descriptionRef} id="description" className="description-section">
                    <h2>Description</h2>
                    <p>The modern treatment concept ensures the healthy recovery of every patient and advocates
                        a healthy lifestyle. At G4, the primary goal of our clinic philosophy is to help patients
                        recover and to ensure their vitality through prevention and a healthy and balanced lifestyle
                        that includes both physical and emotional aspects.</p>
                </div>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>

            </div>
        );
    }





    export default function Homepage() {
        return (
            <div>
                <Header/>
                {body()}
                <Footer/>
            </div>
        );

    }

