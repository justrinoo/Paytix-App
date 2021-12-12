import axios from '../../utils/axios';

export const getAllSchedule = (page, limit, movieId) => {
  return {
    type: 'GETALLSCHEDULE',
    payload: axios.get(
      `schedule?searchMovieId=${movieId}&page=${page}&limit=${limit}`,
    ),
  };
};
