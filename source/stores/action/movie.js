import axios from '../../utils/axios';

export const getAllMovie = limit => {
  return {
    type: 'GETALLMOVIE',
    payload: axios.get(`movie?limit=${limit}`),
  };
};

export const getMovieById = id => {
  return {
    type: 'GETMOVIEBYID',
    payload: axios.get(`movie/${id}`),
  };
};
