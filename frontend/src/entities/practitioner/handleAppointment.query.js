import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = "http://localhost:3001";

// for get gpss and timeslot date
export function useHandleAppointmentQuery(gpId){
    return useQuery({
      queryKey: ["appointments", gpId], // gpId 是动态参数
      queryFn: async () => {
        var response = await axios(`${baseURL}/appointment?gpId=${gpId}`);
        return response.data;
      },
    });
  }  

  const updateAppointmentRequest = async (appointmentId,gpId,slotId,gpName,time,date,status) => {
    const response = await axios.patch(`${baseURL}/appointment/${appointmentId}`, {
        gpId,
        slotId,
        gpName,
        time,
        date,
        status
    }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
  };

  export const useUpdateAppointmentMutation = () => {
    return useMutation({
      mutationFn:(data)=> updateAppointmentRequest(data.appointmentId,data.gpId,data.slotId,data.gpName,data.time,data.date,data.status),
      onSuccess: (data) => {
        console.log('appointment updated successfully:', data);
        alert('appointment updated successfully!');
      },
      onError: (error) => {
        console.error('Error updating appointment:', error);
        alert('Failed to update appointment: ' + error.message);
      }
    });
  };