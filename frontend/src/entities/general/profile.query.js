import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = "http://localhost:3001";

// for get gpss and timeslot date
export function useProfileQuery(userId){
    return useQuery({
      queryKey: ["profile", userId], // 
      queryFn: async () => {
        var response = await axios(`${baseURL}/profile?userId=${userId}`);
        console.log("from query:",response.data)
        return response.data;
      },
    });
  }  

  const updateProfileRequest = async (profileId,name,gender,profession,hobby,email,aboutMe) => {
    const response = await axios.patch(`${baseURL}/profile/${profileId}`, {
        name,
        gender,
        profession,
        hobby,
        email,
        aboutMe
    }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; 
  };

  export const useUpdateProfileMutation = () => {
    return useMutation({
      mutationFn:(data)=> updateProfileRequest(data.profileId,data.name,data.gender,data.profession,data.hobby,data.email,data.aboutMe),
      onSuccess: (data) => {
        console.log('Profile updated successfully:', data);
        alert('Profile updated successfully!');
      },
      onError: (error) => {
        console.error('Error updating Profile:', error);
        alert('Failed to update Profile: ' + error.message);
      }
    });
  };