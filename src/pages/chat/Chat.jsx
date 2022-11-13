import React, { useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import Message from './components/Message/Message';
import MessageInput from './components/MessageInput/MessageInput';
import UserBadge from './components/UserBadge/UserBadge';
import { getChatHistory, selectMessages } from '../../features/chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../features/chat/chatApi';

const Chat = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const chatContainer = useRef(null);
  const {data} = useGetMessagesQuery()

  const allMessages = messages?.slice(0).reverse().concat(data?.messages || [])

  useEffect(() => {
    dispatch(getChatHistory())
  }, [dispatch])

  useEffect(() => {
    if (chatContainer.current) {
      window.scrollTo(0, chatContainer.current.scrollHeight);

    }
  }, [allMessages])

  return (
    <div className={styles.chat} ref={chatContainer}>
      <div className={styles.messagesContainer}>
        {allMessages.map(
          message =>
            <div key={message.messageId}>
              <UserBadge userName={message.sender === 100112 ? 'Брокер' : 'Клиент'} />
              <Message
                isReceived={message.sender !== 100112}
                timestamp={message.timestamp}
                text={message.text}
              />
            </div>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;