import ACTION from "../actions/actionTypes";

const initialState = {
  checkOffers: [],
  isEndData: false,
  isFetching: false,
  error: null,
  sendedEmailMessages: [],
  isEndMessages: false,
};

function checkOfferReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_OFFERS_FOR_MODERATOR_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_FOR_MODERATOR_SUCCESS: {
      const { foundOffers, isEndData } = action.data;
      return {
        ...state,
        isFetching: false,
        checkOffers: foundOffers,
        isEndData,
      };
    }
    case ACTION.GET_OFFERS_FOR_MODERATOR_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case ACTION.GET_EMAIL_MESSAGE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_EMAIL_MESSAGE_SUCCESS: {
      const { messages, isEndMessages } = action.data;
      return {
        ...state,
        isFetching: false,
        sendedEmailMessages: messages,
        isEndMessages,
      };
    }
    case ACTION.GET_EMAIL_MESSAGE_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case ACTION.DIRECT_EMAIL_BOX_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.DIRECT_EMAIL_BOX_SUCCESS: {
      const {
        data: { emailLink, id },
      } = action;

      const { sendedEmailMessages } = state;

      const newEmailMessages = sendedEmailMessages.map((message) => {
        if (message.id === id) {
          message.email = emailLink;
        }

        return message;
      });

      return {
        ...state,
        isFetching: false,
        sendedEmailMessages: newEmailMessages,
      };
    }
    case ACTION.DIRECT_EMAIL_BOX_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    default:
      return state;
  }
}

export default checkOfferReducer;
