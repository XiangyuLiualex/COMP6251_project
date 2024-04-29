import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { pathKeys } from "../../pages/medical/config/path";

// const baseURL = "http://localhost:3001";

// for get gpss and timeslot date
export function useHandleAppointmentQuery(gpId) {
  return useQuery({
    queryKey: ["appointments", gpId], // gpId 是动态参数
    queryFn: async () => {
      // `${baseURL}/appointment?gpId=${gpId}`
      var response = await axios(pathKeys.appointment.apiGetAppointmentById(gpId));
      return response.data;
    },
  });
}

const updateAppointmentRequest = async (appointmentId, gpId, slotId, gpName, time, date, status) => {
  // `${baseURL}/appointment/${appointmentId}`
  const response = await axios.patch(pathKeys.appointment.apiUpdateAppointmentById(appointmentId), {
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
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => updateAppointmentRequest(data.appointmentId, data.gpId, data.slotId, data.gpName, data.time, data.date, data.status),
    onSuccess: (data) => {
      enqueueSnackbar('Appointment update successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('appointment updated successfully:', data);
      // alert('appointment updated successfully!');
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update appointment: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error('Error updating appointment:', error);
      // alert('Failed to update appointment: ' + error.message);
    }
  });
};


const updateAppointmentStatusRequest = async (appointmentId,status) => {
  // `${baseURL}/appointment/${appointmentId}`
  const response = await axios.patch(pathKeys.appointment.apiUpdateAppointmentById(appointmentId), {
    status
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useUpdateAppointmentStatusMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => updateAppointmentStatusRequest(data.appointmentId, data.status),
    onSuccess: (data) => {
      enqueueSnackbar('Appointment update successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('appointment updated successfully:', data);
      // alert('appointment updated successfully!');
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update appointment: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error('Error updating appointment:', error);
      // alert('Failed to update appointment: ' + error.message);
    }
  });
};