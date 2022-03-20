const { Router } = require("express");
const { checkToken } = require("./../middlewares/checkToken");
const {
  getPreview,
  getCatalogs,
  getChat,
  addMessage,
  createCatalog,
  blackList,
  favoriteList,
  addNewChatToCatalog,
  removeChatFromCatalog,
  updateNameCatalog,
  deleteCatalog,
} = require("./../controllers/chatController");

const chatRouter = Router({ strict: true });

chatRouter.use(checkToken);

chatRouter.get("/preview", getPreview);
chatRouter.get("/catalogs", getCatalogs);
chatRouter.get("/:interlocutorId", getChat);

chatRouter.post("/newMessage", addMessage);
chatRouter.post("/newCatalog", createCatalog);

chatRouter.patch("/blackList", blackList);
chatRouter.patch("/favoriteList", favoriteList);

chatRouter
  .route("/:catalogId/:chatId")
  .patch(addNewChatToCatalog)
  .delete(removeChatFromCatalog);
chatRouter.route("/:catalogId").patch(updateNameCatalog).delete(deleteCatalog);

module.exports = chatRouter;
