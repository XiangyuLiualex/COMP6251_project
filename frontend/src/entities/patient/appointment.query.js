import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = "http://localhost:3001";

// 创建一个函数用于调用API
const updateSlotRequest = async (slotId, bookedByPID) => {
    console.log(slotId+" "+bookedByPID);
    console.log(`${baseURL}/slots/${slotId}`, bookedByPID);
    const response = await axios.patch(`${baseURL}/slots/${slotId}`, {
        bookedByPID,
    status:"hold"
    }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(`${baseURL}/slots/${slotId}`, bookedByPID);
  
  return response.data; // 返回响应数据
};

// 使用useMutation钩子，并添加成功和错误处理
const useUpdateSlotMutation = () => {
  return useMutation({
    mutationFn:(data)=> updateSlotRequest(data.slotId,data.bookedByPID),
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

export default useUpdateSlotMutation;
