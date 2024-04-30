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


export function useTestQuery() {
  return useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      var response = await axios(pathKeys.test.apiAddTest() );
      return response.data;
    },
  });
}



const updateTestRequest = async (testId,testerId,result) => {
  const response = await axios.patch(pathKeys.test.apiUpdateTestById(testId), {
    testerId,
    result
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useUpdateTestMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => updateTestRequest(data.testId, data.testerId, data.result),
    onSuccess: (data) => {
      enqueueSnackbar('Test update successfully!', { variant: 'success', autoHideDuration: 2000 });
      // console.log('Test updated successfully:', data);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update test: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      // console.error('Error updating Test:', error);
    }
  });
};



const doneTestRequest = async (testId) => {
  const response = await axios.patch(pathKeys.test.apiUpdateTestById(testId), {
    status:"done"
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useDoneTestMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => doneTestRequest(data.testId),
    onSuccess: (data) => {
      enqueueSnackbar('Test Done successfully!', { variant: 'success', autoHideDuration: 2000 });
      // console.log('Test updated successfully:', data);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to Done test: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      // console.error('Error updating Test:', error);
    }
  });
};