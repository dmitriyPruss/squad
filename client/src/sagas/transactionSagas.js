import { put } from "redux-saga/effects";
import {
  getTransactionError,
  getTransactionRequest,
  getTransactionSuccess,
} from "../actions/actionCreator";
import * as restController from "../api/rest/restController";

export function* getTransactionSaga() {
  yield put(getTransactionRequest());
  try {
    const { data: transactions } = yield restController.getTransactions();

    yield put(getTransactionSuccess(transactions));
  } catch (err) {
    console.log(`err`, err.response);
    yield put(getTransactionError(err.response));
  }
}
