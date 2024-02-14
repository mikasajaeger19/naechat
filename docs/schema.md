# Chat API Schema

This document outlines the schema for a chat API, which includes models for users, groups, chats, and messages.

## User Model

Represents users with fields for email, username, password, and optional biography.

- **Fields:**
  - `id`: Unique identifier for the user.
  - `email`: Unique email address of the user.
  - `username`: Unique username of the user.
  - `password`: Password of the user.
  - `bio`: Optional biography of the user.

- **Relationships:**
  - Users can be members of multiple groups.
  - Users can send multiple messages.

## Group Model

Represents groups in which users can participate.

- **Fields:**
  - `id`: Unique identifier for the group.
  - `name`: Name of the group.
  - `createdAt`: Date and time when the group was created.

- **Relationships:**
  - Groups can have multiple users who are members.
  - Groups can have multiple chats associated with them.

## Chat Model

Represents individual chat conversations within groups.

- **Fields:**
  - `id`: Unique identifier for the chat.
  - `group`: Reference to the group to which the chat belongs.
  - `groupId`: ID of the group to maintain the relationship.

- **Relationships:**
  - Chats can have multiple messages exchanged within them.

## Message Model

Represents messages sent within chats.

- **Fields:**
  - `id`: Unique identifier for the message.
  - `text`: Content of the message.
  - `createdAt`: Date and time when the message was sent.
  - `user`: Reference to the user who sent the message.
  - `userId`: ID of the user who sent the message.
  - `chat`: Reference to the chat to which the message belongs.
  - `chatId`: ID of the chat to maintain the relationship.

---

This schema allows for:

- Users to be members of multiple groups and to send multiple messages.
- Groups to have multiple users and chats associated with them.
- Chats to have multiple messages and be associated with a single group.
- Messages to belong to a single user and chat.

It provides a solid foundation for building a chat API, with the potential for further refinement and expansion based on specific requirements and use cases. Additional features like message editing, deletion, user authentication, authorization, and pagination can be implemented as needed.
