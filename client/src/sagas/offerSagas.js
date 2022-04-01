import { put, select } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import * as restController from "../api/rest/restController";
import {
  getOffersForModeratorRequest,
  getOffersForModeratorSuccess,
  getOffersForModeratorError,
  getEmailMessageRequest,
  getEmailMessageSuccess,
  getEmailMessageError,
  directEmailBoxRequest,
  directEmailBoxSuccess,
  directEmailBoxError,
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

    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);

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

export function* getOffersForModeratorSaga(action) {
  const { page } = action;

  yield put(getOffersForModeratorRequest());

  try {
    const { data } = yield restController.getOffersForModerator(page);
    yield put(getOffersForModeratorSuccess(data));
  } catch (error) {
    yield put(getOffersForModeratorError(error));
  }
}

export function* getEmailMessageSaga(action) {
  const { page } = action;

  yield put(getEmailMessageRequest());

  try {
    const { data } = yield restController.getEmailMessages(page);
    yield put(getEmailMessageSuccess(data));
  } catch (error) {
    yield put(getEmailMessageError(error));
  }
}

export function* directEmailBoxSaga(action) {
  yield put(directEmailBoxRequest());

  try {
    const { data } = yield restController.directEmailBox(action.data);
    yield put(directEmailBoxSuccess(data));
  } catch (error) {
    yield put(directEmailBoxError(error));
  }
}
