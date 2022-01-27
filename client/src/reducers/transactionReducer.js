import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  transactions: []
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ACTION_TYPES.GET_TRANSACTION_REQUEST: {
      return { ...state, isFetching: true };
    }
    case ACTION_TYPES.GET_TRANSACTION_SUCCESS: {
      const { transactions } = action;

      return { ...state, isFetching: false, transactions };
    }
    case ACTION_TYPES.GET_TRANSACTION_ERROR: {
      const { error } = action;
      return { ...state, isFetching: false, error };
    }
    default:
      return state;
  }
}
