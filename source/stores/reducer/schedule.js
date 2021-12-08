const globalState = {
  schedules: [],
  error: false,
  message: '',
  loading: false,
  paginationInfo: {},
};
export default function movie(state = globalState, action) {
  switch (action.type) {
    case 'GETALLSCHEDULE_PENDING': {
      return {
        ...state,
        error: false,
        loading: false,
        message: '',
      };
    }
    case 'GETALLSCHEDULE_FULFILLED': {
      return {
        ...state,
        error: false,
        loading: false,
        schedules: action.payload.data.data,
        paginationInfo: action.payload.data.pagination,
        message: action.payload.data.message,
      };
    }
    case 'GETALLSCHEDULE_REJECTED': {
      return {
        ...state,
        error: false,
        loading: false,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
}
