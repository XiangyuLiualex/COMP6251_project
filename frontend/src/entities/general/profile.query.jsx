import { colors } from "@mui/material";
import { authorizationHeader, sessionStore } from "../session";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { pathKeys } from "../../pages/medical/config/path";

// const baseURL = "http://localhost:3001";

export function useProfileQuery(userId) {
  const { enqueueSnackbar } = useSnackbar();
  return useQuery({
    queryKey: ["profile", userId], //
    queryFn: async () => {
      // `${baseURL}/profile?userId=${userId}`
      var response = await axios(pathKeys.profile.apiGetProfileById(userId));
      console.log("from query:", response.data);
      if (response.status !== 200 || response.data.length === 0) {
        // enqueueSnackbar('No profile found, please create your profile first.',
        //   { variant: 'info', autoHideDuration: 3500 });
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
  phoneNum,
  birthday,
  aboutMe
) => {
  var fn = null;
  // `${baseURL}/profile`
  var url = pathKeys.profile.apiEditProfile();
  var payload = {
    name,
    gender,
    profession,
    phoneNum,
    birthday,
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
  console.log("update url by "+url)
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
        data.phoneNum,
        data.birthday,
        data.aboutMe
      ),
    onSuccess: (data) => {
      enqueueSnackbar('update success.', { variant: 'success', autoHideDuration: 2000 });
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      enqueueSnackbar("Failed to update Profile: " + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error("Error updating Profile:", error);
      // alert("Failed to update Profile: " + error.message);
    },
  });
};
