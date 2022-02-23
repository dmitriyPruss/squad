import { put, select } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import * as restController from "../api/rest/restController";
import {
  checkNewOfferRequest,
  checkNewOfferSuccess,
  checkNewOfferError,
  checkOfferSendmailRequest,
  checkOfferSendmailSuccess,
  checkOfferSendmailError,
  getEmailMessageRequest,
  getEmailMessageSuccess,
  getEmailMessageError,
  directEmailBoxRequest,
  directEmailBoxSuccess,
  directEmailBoxError,
  changeOfferStatusRequest,
  changeOfferStatusSuccess,
  changeOfferStatusError,
} from "../actions/actionCreator";
import CONSTANTS from "../constants";

const {
  STATUS: {
    OFFER: { REJECTED, WON },
  },
} = CONSTANTS;

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      const {
        data: { mark, offerId },
      } = action;
      const { rating, userId } = data;

      if (offer.User.id === userId) {
        offer.User.rating = rating;
      }
      if (offer.id === offerId) {
        offer.mark = mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {

  try {
    console.log('action setOfferStatus ', action);

    const { data } = yield restController.setOfferStatus(action.data);

    console.log('setOfferStatus data ', data);

    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (data.status === WON) {
        offer.status = data.id === offer.id ? WON : REJECTED;
      } else if (data.id === offer.id) {
        offer.status = REJECTED;
      }
    });

    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}

// Check new Offer
export function* checkOfferSaga(action) {
  console.log("checkOfferSaga action", action);

  const { page } = action;

  yield put(checkNewOfferRequest());

  try {
    const { data } = yield restController.checkNewOffer(page);
    console.log("restController.checkNewOffer data", data);

    yield put(checkNewOfferSuccess(data));
  } catch (error) {
    yield put(checkNewOfferError(error));
  }
}

// Check Offer Email
export function* checkOfferEmailSaga(action) {
  console.log("action.data EMAIL", action.data);

  yield put(checkOfferSendmailRequest());

  try {
    const { data } = yield restController.checkOfferEmail(action.data);
    console.log("restController.checkOfferEmail data", data);

    yield put(checkOfferSendmailSuccess(data));
  } catch (error) {
    yield put(checkOfferSendmailError(error));
  }
}

// Get email messages
export function* getEmailMessageSaga(action) {
  const { page } = action;

  yield put(getEmailMessageRequest());

  try {
    const { data } = yield restController.getEmailMessages(page);
    console.log("restController.getEmailMessages data", data);

    yield put(getEmailMessageSuccess(data));
  } catch (error) {
    yield put(getEmailMessageError(error));
  }
}

// direct email box
export function* directEmailBoxSaga(action) {
  console.log("action.data EMAIL BOX", action.data);

  yield put(directEmailBoxRequest());

  try {
    const { data } = yield restController.directEmailBox(action.data);
    console.log("restController.directEmailBox data", data);

    yield put(directEmailBoxSuccess(data));
  } catch (error) {
    yield put(directEmailBoxError(error));
  }
}

// Change offer status
export function* changeOfferStatusSaga(action) {
  console.log("action.data EMAIL BOX", action.data);

  yield put(changeOfferStatusRequest());

  try {
    const { data } = yield restController.changeOfferStatus(action.data);
    console.log("restController.changeOfferStatus data", data);

    yield put(changeOfferStatusSuccess(data));
  } catch (error) {
    yield put(changeOfferStatusError(error));
  }
}
