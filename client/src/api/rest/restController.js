import http from "../interceptor";
import queryString from "query-string";
// Users
export const getUser = () => http.get("/users/getUser");
export const getTransactions = () => http.get("/users/transactions");
export const cashOut = (data) => http.post("/users/cashout", data);
export const registerRequest = (data) => http.post("/users/registration", data);
export const loginRequest = (data) => http.patch("/users/login", data);
export const changeMark = (data) => http.patch("/users/changeMark", data);
export const updateUser = (data) => http.patch("/users/updateUser", data);
export const payMent = ({ formData }) => http.patch("/users/pay", formData);

// Chats
export const getPreviewChat = () => http.get("/chats/preview");
export const getCatalogList = () => http.get("/chats/catalogs");
export const getDialog = (interlocutorId) =>
  http.get(`/chats/${interlocutorId}`);
export const createCatalog = (data) => http.post("/chats/newCatalog", data);
export const newMessage = (data) => http.post("/chats/newMessage", data);
export const changeChatFavorite = (data) =>
  http.patch("/chats/favoriteList", data);
export const changeChatBlock = (data) => http.patch("/chats/blackList", data);
export const changeCatalogName = (catalogName, catalogId) =>
  http.patch(`/chats/${catalogId}?catalogName=${catalogName}`);
export const addChatToCatalog = (catalogId, chatId) =>
  http.patch(`/chats/${catalogId}/${chatId}`);
export const deleteCatalog = (id) => http.delete(`/chats/${id}`);
export const removeChatFromCatalog = (catalogId, chatId) =>
  http.delete(`/chats/${catalogId}/${chatId}`);

// Contests
export const getCustomersContests = (data) =>
  http.get(`/contests/customers?${queryString.stringify(data)}`);
export const getActiveContests = (data) =>
  http.get(`/contests/all?${queryString.stringify(data)}`);
export const getContestById = ({ contestId }) =>
  http.get(`/contests/${contestId}`);
export const dataForContest = (data) =>
  http.post("/contests/dataForContest", data);
export const updateContest = (data) =>
  http.patch(`/contests/${data.get("contestId")}`, data);

// Offers
export const getOffersForModerator = (page) => http.get(`/offers/${page}`);
export const getEmailMessages = (page) =>
  http.get(`/offers/emailMessages/${page}`);
export const setNewOffer = (data) => http.post("/offers/setNewOffer", data);
export const setOfferStatus = (data) =>
  http.post("/offers/setOfferStatus", data);
export const directEmailBox = (data) =>
  http.post("/offers/directEmailBox", data);
