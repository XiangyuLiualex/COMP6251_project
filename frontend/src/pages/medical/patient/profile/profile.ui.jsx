import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../../../entities/general/profile.query";
import { sessionStore } from "../../../../entities/session";
import ProfileList from "../../general/generalProfile.ui";
import { Button, Box } from '@mui/material';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export function DeleteAccount() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error" // Make the button stand out as a serious action
        startIcon={<DeleteForeverIcon />} // Adds an icon for visual impact
        onClick={handleClickOpen}
        sx={{ mt: 2 }} // Adds margin top for spacing
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete your account?
            <br />
            <strong>This action cannot be undone.</strong>
            <br />
            All your data will be irreversibly removed from our hospital system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function PatientProfilePage() {
  const id = sessionStore.getState().uid;
  const { data, isLoading, isError, refetch } = useProfileQuery(id);
  const patchMutate = useUpdateProfileMutation("PATCH");

  if (isLoading) {
    return <div>Loading...</div>; // 或其他加载指示器
  }
  if (isError) {
    return <div>Error: {isError.message}</div>; // 显示错误信息
  }

  const profile = data;
  const mutateProfile = patchMutate;

  if (mutateProfile.isSuccess) {
    refetch();
  }

  console.log("here i am" + profile.name);
  const handleUpdateProfile = (
    profileId,
    name,
    gender,
    profession,
    phoneNum,
    birthday,
    aboutMe
  ) => {
    mutateProfile.mutate({
      profileId: profileId,
      name: name,
      gender: gender,
      profession: profession,
      phoneNum: phoneNum,
      birthday: birthday,
      aboutMe: aboutMe,
    });
  };

  return (
    <div>
      {/* <h1>Profile</h1> */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Profile Page</h1>
        <DeleteAccount />
      </Box>
      <ProfileList profile={profile} onUpdateProfile={handleUpdateProfile} />
    </div>
  );
}
