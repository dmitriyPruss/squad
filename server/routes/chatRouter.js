const { Router } = require("express");
const { checkToken } = require("./../middlewares/checkToken");
const chatController = require("./../controllers/chatController");

const chatRouter = Router({strict: true});

chatRouter.use(checkToken);

chatRouter.post("/newMessage", chatController.addMessage);

chatRouter.post("/newCatalog", chatController.createCatalog);

chatRouter.get("/preview", chatController.getPreview);

chatRouter.get("/catalogs", chatController.getCatalogs);

chatRouter.get("/:interlocutorId", chatController.getChat);

chatRouter.patch("/blackList", chatController.blackList);

chatRouter.patch("/favoriteList", chatController.favoriteList);

chatRouter
  .route("/:catalogId/:chatId")
  .patch( chatController.addNewChatToCatalog)
  .delete(chatController.removeChatFromCatalog);

chatRouter
  .route("/:catalogId")
  .patch(chatController.updateNameCatalog)
  .delete(chatController.deleteCatalog);



module.exports = chatRouter;
