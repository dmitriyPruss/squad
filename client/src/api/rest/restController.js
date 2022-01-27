import http from '../interceptor';
import queryString from 'query-string';

// Users
export const registerRequest = data => {
  console.log(`registerData data`, data);

  console.log(`http`, http);

  return http.post('/users/registration', data);
};
export const loginRequest = data => http.post('/users/login', data);
export const payMent = ({ formData }) => http.post('/users/pay', formData);
export const getUser = () => http.post('/users/getUser');

export const changeMark = data => http.post('/users/changeMark', data);
export const updateUser = data => http.post('/users/updateUser', data);
export const cashOut = data => http.post('/users/cashout', data);

// Chats
export const getPreviewChat = () => http.post('/chats/getPreview');
export const getDialog = data => http.post('/chats/getChat', data);
export const newMessage = data => http.post('/chats/newMessage', data);
export const changeChatFavorite = data => http.post('/chats/favorite', data);
export const changeChatBlock = data => http.post('/chats/blackList', data);
export const getCatalogList = data => http.post('/chats/getCatalogs', data);
export const addChatToCatalog = data =>
  http.post('/chats/addNewChatToCatalog', data);
export const createCatalog = data => http.post('/chats/createCatalog', data);
export const deleteCatalog = data => http.post('/chats/deleteCatalog', data);
export const removeChatFromCatalog = data =>
  http.post('/chats/removeChatFromCatalog', data);
export const changeCatalogName = data =>
  http.post('/chats/updateNameCatalog', data);

// Contests
export const getCustomersContests = data =>
  http.get(`/contests/customers?${queryString.stringify(data)}`);

export const getActiveContests = data =>
  http.get(`/contests/all?${queryString.stringify(data)}`);

export const getContestById = ({ contestId }) =>
  http.get(`/contests/${contestId}`);

export const updateContest = data =>
  http.patch(`/contests/${data.get('contestId')}`, data);

export const dataForContest = data =>
  http.post('/contests/dataForContest', data);

// Contests 2
export const setNewOffer = data => http.post('/contests/setNewOffer', data);

export const setOfferStatus = data =>
  http.post('/contests/setOfferStatus', data);

export const downloadContestFile = data =>
  http.get(`/contests/downloadFile/${data.fileName}`);

// Transactions
export const getTransactions = () => http.get('/transactions');
