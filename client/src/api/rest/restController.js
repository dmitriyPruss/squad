import http from "../interceptor";
import queryString from "query-string";

// Users
export const registerRequest = (data) => http.post("/users/registration", data);

export const loginRequest = (data) => http.post("/users/login", data);
export const payMent = ({ formData }) => http.post("/users/pay", formData);
export const getUser = () => http.post("/users/getUser");

export const changeMark = (data) => http.post("/users/changeMark", data);
export const updateUser = (data) => http.post("/users/updateUser", data);
export const cashOut = (data) => http.post("/users/cashout", data);

// Chats
export const getPreviewChat = () => http.get("/chats/preview");
export const getDialog = (interlocutorId) => http.get(`/chats/${interlocutorId}`);
export const newMessage = (data) => http.post("/chats/newMessage", data);
export const changeChatFavorite = (data) => http.patch("/chats/favoriteList", data);
export const changeChatBlock = (data) => http.patch("/chats/blackList", data);
export const getCatalogList = () => http.get("/chats/catalogs");
export const addChatToCatalog = (catalogId, chatId) => http.patch(`/chats/${catalogId}/${chatId}`);
export const createCatalog = (data) => http.post("/chats/newCatalog", data);
export const deleteCatalog = (id) => http.delete(`/chats/${id}`);
export const removeChatFromCatalog = (catalogId, chatId) =>
  http.delete(`/chats/${catalogId}/${chatId}`);
export const changeCatalogName = (catalogName, catalogId) =>
  http.patch(`/chats/${catalogId}?catalogName=${catalogName}`);

// Contests
export const getCustomersContests = (data) =>
  http.get(`/contests/customers?${queryString.stringify(data)}`);

export const getActiveContests = (data) => http.get(`/contests/all?${queryString.stringify(data)}`);

export const getContestById = ({ contestId }) => http.get(`/contests/${contestId}`);

export const updateContest = (data) => http.patch(`/contests/${data.get("contestId")}`, data);

export const dataForContest = (data) => http.post("/contests/dataForContest", data);

// Contests 2
export const getOffersForModerator = (page) => http.get(`/contests/offers/${page}`);
export const getEmailMessages = (page) => http.get(`/contests/emailMessages/${page}`);
export const directEmailBox = (data) => http.post("/contests/directEmailBox", data);

export const setNewOffer = (data) => http.post("/contests/setNewOffer", data);

export const setOfferStatus = (data) => http.post("/contests/setOfferStatus", data);

export const downloadContestFile = (data) => http.get(`/contests/downloadFile/${data.fileName}`);

// Transactions
export const getTransactions = () => http.get("/transactions");
