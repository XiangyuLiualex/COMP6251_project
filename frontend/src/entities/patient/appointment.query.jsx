import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = "http://localhost:3001";

// For update slot
// 创建一个函数用于调用API
const updateSlotRequest = async (slotId, bookedByPID) => {
  const response = await axios.patch(`${baseURL}/slots/${slotId}`, {
    bookedByPID,
    status: "hold"
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

// 使用useMutation钩子，并添加成功和错误处理
const useUpdateSlotMutation = () => {
  return useMutation({
    mutationFn: (data) => updateSlotRequest(data.slotId, data.bookedByPID),
    onSuccess: (data) => {
      // 成功回调函数
      console.log('Slot updated successfully:', data);
      alert('Slot updated successfully!');
    },
    onError: (error) => {
      // 错误处理回调函数
      console.error('Error updating slot:', error);
      alert('Failed to update slot: ' + error.message);
    }
  });
};

// for submit appointment
const submitAppointmentRequest = async (patientId, gpId, slotId, gpName, time, date, reason) => {
  console.log("Submitting url with :", { patientId, gpId, slotId, gpName, time, date, reason });
  const response = await axios.post(`${baseURL}/appointment/`, {
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
  return useMutation({

    mutationFn: (data) => submitAppointmentRequest(data.patientId, data.gpId, data.slotId, data.gpName, data.time, data.date, data.reason),
    onSuccess: (data) => {
      // 成功回调函数
      console.log('Appointment submit successfully:', data);
      alert('Appointment submit successfully!');
    },
    onError: (error) => {
      // 错误处理回调函数
      console.error('Error Appointment submit:', error);
      alert('Failed to Appointment submit: ' + error.message);
    }
  });
};

// for get gpss and timeslot date
export function useAppointmentQuery() {
  return useQuery({
    queryKey: ["speakers"],
    queryFn: async () => {
      var gpss = await axios("http://localhost:3001/gpss");
      // console.log(gpss.data);
      var slots = await axios("http://localhost:3001/slots")

      var response = gpss.data.map(gp => {
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

export default useUpdateSlotMutation;
