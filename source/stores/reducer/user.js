const globalState = {
  users: [],
  setDataTicket: {},
  loading: false,
  error: false,
  message: '',
};

export default function user(state = globalState, action) {
  switch (action.type) {
    case 'GETUSER_PENDING': {
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
      };
    }
    case 'GETUSER_FULFILLED': {
      return {
        ...state,
        loading: false,
        error: false,
        users: action.payload.data.data,
        message: action.payload.data.message,
      };
    }
    case 'GETUSER_REJECTED': {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload.response.data.message,
      };
    }
    case 'SETDATATICKETBOOKING_PENDING': {
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
      };
    }
    case 'SETDATATICKETBOOKING_FULFILLED': {
      return {
        ...state,
        loading: false,
        error: false,
        setDataTicket: action.payload.data.data,
        message: action.payload.data.message,
      };
    }
    case 'SETDATATICKETBOOKING_REJECTED': {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
}
