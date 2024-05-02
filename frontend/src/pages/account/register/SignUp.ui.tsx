import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Link, Step, Stepper, StepLabel } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Send } from "@mui/icons-material";
import { SignUpForm, useSignUpMutation } from "../../../entities/register";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function InformationPermission() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Provide Consent
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Consent for Access to Medical Information"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        To ensure the highest standard of medical service and efficient care coordination, 
                        we require your consent to share your basic personal information and medical history 
                        with healthcare professionals involved in your treatment. All shared information will 
                        be handled confidentially and accessed only by authorized personnel.
                        <br />
                        <strong>If you do not provide consent, you will not be able to use this website.</strong>
                        This measure is necessary to maintain the integrity and security of our operations 
                        and your medical care.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}





// TODO common lib function, add default value for T
// transform FormData to json type T
export function formDataToJson<T>(formData: FormData): T {
    const result: any = {};

    for (let entry of formData.entries()) {
        const [key, value] = entry;
        result[key as keyof T] = value;
    }

    return result;
}


export function SignUpPage() {
    const { mutate, isPending, isError, error } = useSignUpMutation();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const dto = formDataToJson<SignUpForm>(formData);
        // console.log("dto", dto);
        mutate(dto);
    };

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <InformationPermission/>
                    <Box sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'row',
                    }} >
                        <Stepper activeStep={0} alternativeLabel>
                            <Step>
                                <StepLabel>Create account</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Self register with essential information</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Waiting for approval</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Access the practice service</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <LoadingButton
                            size="large"
                            type="submit"
                            fullWidth
                            color="success"
                            loading={isPending}
                            loadingPosition="start"
                            startIcon={<Send />}
                            sx={{ mt: 3, mb: 2 }}
                            variant="outlined">
                            Sign Up
                        </LoadingButton>
                        {/* TODO: extract to a common component */}
                        {isError && <div style={{ color: "red" }}>{String(error)}</div>}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container >
        </div>
    );
}
