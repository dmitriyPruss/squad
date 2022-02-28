import ACTION from "../actions/actionTypes";

const initialState = {
  checkOffers: [],
  isEndData: false,
  isFetching: false,
  error: null,
  sendedEmailMessages: [],
  isEndMessages: false
};

function checkOfferReducer(state = initialState, action) {
  switch (action.type) {
    // getOffersForModerator !!!
    case ACTION.GET_OFFERS_FOR_MODERATOR_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_FOR_MODERATOR_SUCCESS: {
      const { foundOffers, isEndData } = action.data;

      console.log("REDUCER - GET_OFFERS_FOR_MODERATOR_SUCCESS data", foundOffers, isEndData );

      return {
        ...state,
        isFetching: false,
        checkOffers: foundOffers,
        isEndData
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

    // GET EMAIL
    case ACTION.GET_EMAIL_MESSAGE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_EMAIL_MESSAGE_SUCCESS: {
      const { offers, isEndMessages } = action.data;

      return {
        ...state,
        isFetching: false,
        sendedEmailMessages: offers,
        isEndMessages
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

    // DIRECT EMAIL BOX
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

      console.log("checkOffers", sendedEmailMessages);

      const newEmailMessages = sendedEmailMessages.map((message) => {
        if (message.id === id) {
          message.email = emailLink;
        }

        return message;
      });

      console.log("REDUCER - DIRECT_EMAIL_BOX_SUCCESS data", action.data);

      console.log("newEmailMessages", newEmailMessages);

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
};

export default checkOfferReducer;
