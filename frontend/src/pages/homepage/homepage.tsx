import logo from './logo.svg';
import './homepage.css';
import { Box, AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '../medical/config/path';
import homepageImage from '../../assets/homepage.jpg';
import React, { useRef } from 'react';
import  gp1Image from '../../assets/gp1.jpeg';
import  gp2Image from '../../assets/gp2.jpeg';
import  gp3Image from '../../assets/gp3.jpeg';
import  gp4Image from '../../assets/gp4.jpeg';



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
                    <p>G4 Health Practice Pro service is a multi-function medical management platform, including appointment request, Expert Recommendation, update of medical history, e-prescription and appointment of additional testing services. The implementation of these functions is aimed at improving the efficiency of medical services and patient satisfaction while ensuring compliance with data processing.</p>
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

function DoctorCard({ doctor }) {
    return (
        <div className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-photo" />
            <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <p>{doctor.experience}</p>
            </div>
        </div>
    );
}

function Doctors() {
    const doctors = [
        {
            name: "Dr. Emily Roberts",
            specialty: "General Practitioner",
            experience: "15 years of experience in family medicine",
            image: gp1Image
        },
        {
            name: "Dr. John Smith",
            specialty: "General Practitioner",
            experience: "10 years of experience, with a focus on pediatric and adult care",
            image: gp2Image
        },
        {
            name: "Dr. Susan Lee",
            specialty: "General Practitioner",
            experience: "Specializes in chronic disease management",
            image: gp3Image
        },
        {
            name: "Dr. Mark Johnson",
            specialty: "General Practitioner",
            experience: "Expert in preventative healthcare",
            image: gp4Image
        }
    ];

    return (
        <div className="doctors-container">
            <h1>Doctors Team </h1>
            <div>
                {doctors.map(doctor => <DoctorCard key={doctor.name} doctor={doctor}/>)}
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>G4 Practice Service in Southampton</p>
                    <p>📞 0123 456 789</p>
                    <p>📧 G4HealthPractice@email.com</p>
                </div>
                <div className="footer-map">
                    <h3>realmap</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.3497096557294!2d-1.3992183875135678!3d50.93574535218484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487473f58304cebf%3A0x50cabc792a027365!2sUniversity%20of%20Southampton%20Highfield%20Campus!5e0!3m2!1szh-CN!2suk!4v1715172476008!5m2!1szh-CN!2suk"
                        width="600"
                        height="450"
                        style={{border: 0}}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <p>© 2024 G4 Health Practice Pro. All rights reserved</p>
        </footer>
    )
}


export default function Homepage() {
    return (
        <div>
            <Header/>
            {body()}
            {Doctors()}
            <Footer/>
        </div>
    );

}

