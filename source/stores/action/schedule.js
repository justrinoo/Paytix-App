import axios from '../../utils/axios';

export const getAllSchedule = (page, limit) => {
  return {
    type: 'GETALLSCHEDULE',
    payload: axios.get(`schedule?page=${page}&limit=${limit}`),
  };
};
