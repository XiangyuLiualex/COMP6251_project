import { colors } from "@mui/material";
import { authorizationHeader, sessionStore } from "../session";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from 'notistack';

const baseURL = "http://localhost:3001";

// for get gpss and timeslot date
export function useProfileQuery(userId) {
  const { enqueueSnackbar } = useSnackbar();
  return useQuery({
    queryKey: ["profile", userId], //
    queryFn: async () => {
      var response = await axios(`${baseURL}/profile?userId=${userId}`);
      console.log("from query:", response.data);
      if (response.status !== 200 || response.data.length === 0) {
        enqueueSnackbar('No profile found, please create your profile first.',
          { variant: 'info', autoHideDuration: 3500 });
      }
      return response.data;
    },
  });
}

const updateProfileRequest = async (
  method,
  profileId,
  name,
  gender,
  profession,
  hobby,
  email,
  aboutMe
) => {
  var fn = null;
  var url = `${baseURL}/profile`;
  var payload = {
    name,
    gender,
    profession,
    hobby,
    email,
    aboutMe,
  }
  if (method === "POST") {
    fn = axios.post;
    payload.userId = sessionStore.getState().uid;
  } else if (method === "PATCH") {
    fn = axios.patch;
    url += `/${profileId}`;
  } else {
    throw new Error("Invalid method");
  }
  const response = await fn(
    url,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader(),
      },
    }
  );
  return response.data;
};

export const useUpdateProfileMutation = (method) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) =>
      updateProfileRequest(
        method,
        data.profileId,
        data.name,
        data.gender,
        data.profession,
        data.hobby,
        data.email,
        data.aboutMe
      ),
    onSuccess: (data) => {
      enqueueSnackbar('update success.', { variant: 'success', autoHideDuration: 2000 });
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating Profile:", error);
      alert("Failed to update Profile: " + error.message);
    },
  });
};
