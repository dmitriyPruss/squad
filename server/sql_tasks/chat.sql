CREATE DATABASE "squadhelp-dev"

DROP DATABASE IF EXISTS "squadhelp-dev"

CREATE SCHEMA CHAT;

DROP SCHEMA IF EXISTS CHAT;

-- messages
CREATE TABLE CHAT.Messages(
  id SERIAL PRIMARY KEY,
  sender SMALLINT REFERENCES public."Users" ON DELETE CASCADE, -- reference Users
  body VARCHAR(55) NOT NULL,
  conversation SMALLINT REFERENCES CHAT.Conversations ON DELETE CASCADE ON UPDATE CASCADE, -- reference Conversations
  created_at VARCHAR(55) NOT NULL,
  updated_at VARCHAR(55)
);

DROP TABLE IF EXISTS CHAT.Messages;


-- Conversations

-- table "Convarsations"
CREATE TABLE CHAT.Conversations(
  id SERIAL PRIMARY KEY,
  participants INTEGER[2] NOT NULL,
  favorite_list BOOLEAN[2] NOT NULL,
  black_list BOOLEAN[2] NOT NULL,
  created_at VARCHAR(55) NOT NULL,
  updated_at VARCHAR(55)
)

DROP TABLE IF EXISTS CHAT.Conversations;


-- Catalogs
CREATE TABLE CHAT.Catalogs(
  id SERIAL PRIMARY KEY,
  user_id SMALLINT REFERENCES public."Users" ON DELETE CASCADE, -- reference Users
  catalog_name VARCHAR(20) NOT NULL,
  chats INTEGER[] NOT NULL -- reference Conversations
)

DROP TABLE IF EXISTS CHAT.Catalogs;



