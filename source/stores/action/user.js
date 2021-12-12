import axios from '../../utils/axios';

export const getUser = () => {
  return {
    type: 'GETUSER',
    payload: axios.get('user'),
  };
};
export const setDataTicketBooking = id => {
  return {
    type: 'SETDATATICKETBOOKING',
    payload: axios.get(`booking/booking-id/${id}`),
  };
};
