import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { pathKeys } from "../../pages/medical/config/path";


const addTestRequest = async (patientId,appointmentId,name,date,time,description) => {
  const response = await axios.post(pathKeys.test.apiAddTest(), {
    patientId,
    testerId:"",
    appointmentId,
    name,
    date,
    time,
    description,
    status:"undo",
    result:""
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useAddTestMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => addTestRequest(data.patientId,data.appointmentId,data.name,data.date,data.time,data.description),
    onSuccess: (data) => {
      enqueueSnackbar('Test add successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('Test add successfully:', data);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to add test: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error('Error to add test:', error);
    }
  });
};