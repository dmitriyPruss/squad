import ACTION from "../actions/actionTypes";
import CONSTANTS from "../constants";

const initialState = {
  checkOffers: [],
  isEndData: false,
  isFetching: true,
  error: null,
  sendedEmailMessages: [],
  isEndMessages: false
};

function checkOfferReducer(state = initialState, action) {
  switch (action.type) {
    // checkNewOffer !!!
    case ACTION.CHECK_NEW_OFFER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.CHECK_NEW_OFFER_SUCCESS: {
      const { foundOffers, isEndData } = action.data;

      console.log("REDUCER - CHECK_NEW_OFFER_SUCCESS data", foundOffers, isEndData );

      return {
        ...state,
        isFetching: false,
        checkOffers: foundOffers,
        isEndData
      };
    }
    case ACTION.CHECK_NEW_OFFER_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    // Change offer by Moderator
    case ACTION.CHANGE_OFFER_STATUS_BY_MODERATOR_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.CHANGE_OFFER_STATUS_BY_MODERATOR_SUCCESS: {
      const { data } = action;

      console.log("REDUCER - CHANGE_OFFER_STATUS_BY_MODERATOR_SUCCESS data", data);

      return {
        ...state,
        isFetching: false,
        // checkOffers: data,
      };
    }
    case ACTION.CHANGE_OFFER_STATUS_BY_MODERATOR_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    // CHECK OFFER EMAIL
    case ACTION.CHECK_OFFER_SENDMAIL_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.CHECK_OFFER_SENDMAIL_SUCCESS: {
      const { data: newMessage } = action;
      const { sendedEmailMessages } = state;

      console.log("newMessage", newMessage);

      const newEmailMessages = [...sendedEmailMessages, newMessage];

      console.log("newEmailMessages", newEmailMessages);

      return {
        ...state,
        sendedEmailMessages: newEmailMessages,
        isFetching: false,
      };
    }
    case ACTION.CHECK_OFFER_SENDMAIL_ERROR: {
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
