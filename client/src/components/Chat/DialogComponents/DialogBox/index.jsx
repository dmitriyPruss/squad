import React from "react";
import classNames from "classnames";
import styles from "./DialogBox.module.sass";
import CONSTANTS from "../../../../constants";

const DialogBox = (props) => {
  const {
    chatPreview: { favoriteList, participants, blackList, id, text, createdAt },
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;

  console.log("props", props);

  const {
    ANONYM_IMAGE_PATH,
    PUBLIC_URL,
    PREVIEW_CHAT_MODE: { CATALOG },
  } = CONSTANTS;

  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];

  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <img
        src={
          interlocutor.avatar === "anon.png"
            ? ANONYM_IMAGE_PATH
            : `${PUBLIC_URL}${interlocutor.avatar}`
        }
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createdAt)}</span>
          <i
            onClick={(event) =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
            className={classNames({
              "far fa-heart": !isFavorite,
              "fas fa-heart": isFavorite,
            })}
          />
          <i
            onClick={(event) =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
                event
              )
            }
            className={classNames({
              "fas fa-user-lock": !isBlocked,
              "fas fa-unlock": isBlocked,
            })}
          />
          <i
            onClick={(event) => catalogOperation(event, id)}
            className={classNames({
              "far fa-plus-square": chatMode !== CATALOG,
              "fas fa-minus-circle": chatMode === CATALOG,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
