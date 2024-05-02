import { useQuery, useMutation } from '@tanstack/react-query';
import { pathKeys } from "../../pages/medical/config/path";
import axios from 'axios';
import { useSnackbar } from 'notistack';


// For update slot
// 创建一个函数用于调用API
const updateSlotRequest = async (slotId, bookedByPID, status) => {
  //`${baseURL}/slots/${slotId}`
  const response = await axios.patch(pathKeys.slots.apiUpdateSlotById(slotId), {
    bookedByPID,
    status: status
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

// 使用useMutation钩子，并添加成功和错误处理
const useUpdateSlotMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => updateSlotRequest(data.slotId, data.bookedByPID, data.status),
    onSuccess: (data) => {
      // 成功回调函数
      enqueueSnackbar('Slot updated successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('Slot updated successfully:', data);
      // alert('Slot updated successfully!');
    },
    onError: (error) => {
      // 错误处理回调函数
      enqueueSnackbar('Failed to update slot: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error('Error updating slot:', error);
      // alert('Failed to update slot: ' + error.message);
    }
  });
};

// for submit appointment
const submitAppointmentRequest = async (patientId, gpId, slotId, gpName, time, date, reason) => {
  // console.log("Submitting url with :", { patientId, gpId, slotId, gpName, time, date, reason });
  console.log("send appointment message to " + pathKeys.appointment.apiAddAppointment());
  //`${baseURL}/appointment/`
  const response = await axios.post(pathKeys.appointment.apiAddAppointment(), {
    patientId,
    gpId,
    slotId,
    gpName,
    time,
    date,
    reason,
    "status": "beforeApprove"
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useSubmitAppointmentMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({

    mutationFn: (data) => submitAppointmentRequest(data.patientId, data.gpId, data.slotId, data.gpName, data.time, data.date, data.reason),
    onSuccess: (data) => {
      // 成功回调函数
      enqueueSnackbar('Appointment submit successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('Appointment submit successfully:', data);
      // alert('Appointment submit successfully!');
    },
    onError: (error) => {
      // 错误处理回调函数
      enqueueSnackbar('Failed to Appointment submit: ' + error.message, { variant: 'success', autoHideDuration: 2000 });
      console.error('Error Appointment submit:', error);
      // alert('Failed to Appointment submit: ' + error.message);
    }
  });
};

// for get gpss and timeslot date
export function useAppointmentQuery() {
  return useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      var gpss = await axios(pathKeys.apiGetGpss());
      // var gpss = await axios("http://localhost:3001/gpss");
      var slots = await axios(pathKeys.apiGetSlots());
      // var slots = await axios("http://localhost:3001/slots")

      var response = gpss.data.map(gp => {
        console.log("gp:", gp);
        console.log("slots:", slots.data)
        const gpSlots = slots.data.filter(slot => slot.gpId === gp.id);
        return {
          ...gp,
          slots: gpSlots
        };
      });
      return response;
    },
  });
}

export function useMyAppointmentQuery(patientId) {
  return useQuery({
    queryKey: ["appointments", patientId], // gpId 是动态参数
    queryFn: async () => {
      var response = await axios(pathKeys.appointment.apiGetAppointmentByPId(patientId));
      return response.data;
    },
  });
}

export default useUpdateSlotMutation;
