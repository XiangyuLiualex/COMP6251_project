import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { pathKeys } from "../../pages/medical/config/path";

// const baseURL = "http://localhost:3001";

// for get gpss and timeslot date
export function useTodayAppointmentQuery(gpId,date) {
  return useQuery({
    queryKey: ["appointments", gpId], // gpId 是动态参数
    queryFn: async () => {
      var response = await axios(pathKeys.appointment.apiGetAppointmentByIdAndDate(gpId,date));
      return response.data;
    },
  });
}
