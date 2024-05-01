import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { pathKeys } from "../../pages/medical/config/path";

// {
//     "id": 1,
//     "patientId": 5,
//     "appointmentId": 3,
//     "medicationName":"banlangen",
//     "medicationInstruction":"twice a day",
//     "quantity":"3"
//   }

const addPrescriptionRequest = async (patientId,appointmentId,medicationName,medicationInstruction,quantity) => {
  const response = await axios.post(pathKeys.prescription.apiAddPrescription(), {
    patientId,appointmentId,medicationName,medicationInstruction,quantity
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data; // 返回响应数据
};

export const useAddPrescriptionMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data) => addPrescriptionRequest(data.patientId,data.appointmentId,data.medicationName,data.medicationInstruction,data.quantity),
    onSuccess: (data) => {
      enqueueSnackbar('Prescription add successfully!', { variant: 'success', autoHideDuration: 2000 });
      console.log('Prescription add successfully:', data);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to add Prescription: ' + error.message, { variant: 'failed', autoHideDuration: 3500 });
      console.error('Error to add Prescription:', error);
    }
  });
};

export function usePrescriptionQuery(appointmentId) {
  return useQuery({
    queryKey: ["prescription", appointmentId], // gpId 是动态参数
    queryFn: async () => {
      var response = await axios(pathKeys.prescription.apiViewPrescriptionById(appointmentId));
      return response.data;
    },
  });
}