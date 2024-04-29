import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function UpdateProfileComponent({ profile, onUpdateProfile }) {
  const [open, setOpenAlt] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlt(true);
  };
  const handleClose = () => {
    setOpenAlt(false);
  };
  // console.log(appointment.id);
  // profileId,name,gender,profession,hobby,email,aboutMe
  const handleonUpdate = (formJson, profile) => {
    //   console.log(appointment);
    const updateData = {};
    updateData.id = profile.id;
    if (formJson.name !== '') updateData.name = formJson.name;
    if (formJson.gender !== '') updateData.gender = formJson.gender;
    if (formJson.profession !== '') updateData.profession = formJson.profession;
    if (formJson.hobby !== '') updateData.hobby = formJson.hobby;
    if (formJson.profession !== '') updateData.profession = formJson.profession;
    if (formJson.aboutMe !== '') updateData.aboutMe = formJson.aboutMe;
    const dataToSend = { ...profile, ...updateData };
    onUpdateProfile(dataToSend.id, dataToSend.name, dataToSend.gender, dataToSend.profession, dataToSend.hobby, dataToSend.email, dataToSend.aboutMe);
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleonUpdate(formJson, profile);

            // console.log(slotId==="");
            handleClose();
          },
        }}
      // profileId,name,gender,profession,hobby,email,aboutMe
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the field you want to changed. Please leave the unChange field empty!!
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="gender"
            name="gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="profession"
            name="profession"
            label="Profession"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="hobby"
            name="hobby"
            label="Hobby"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="aboutMe"
            name="aboutMe"
            label="About Me"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}



export default function ProfileList({ profile, onUpdateProfile }) {
  return (
    <List sx={{ width: '60%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Name" secondary={profile.name} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Gender" secondary={profile.gender} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Profession" secondary={profile.profession} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Hobby" secondary={profile.hobby} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Email" secondary={profile.email} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="About Me" secondary={profile.aboutMe} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          secondaryTypographyProps={{ fontSize: '1.1rem' }} />
      </ListItem>
      <ListItem align="center">
        <UpdateProfileComponent profile={profile}
          onUpdateProfile={onUpdateProfile}
        />
      </ListItem>

    </List>
  );
}