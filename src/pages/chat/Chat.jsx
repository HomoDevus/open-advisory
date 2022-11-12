import React, { useEffect } from 'react';
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

  // const {data, isFetching, isLoading} = useGetMessagesQuery()

  useEffect(() => {
    dispatch(getChatHistory())
  }, [dispatch])

  return (
    <div className={styles.chat}>
      <div className={styles.messagesContainer}>
        {messages?.slice(0).reverse().map(message => <div key={message.messageId}><UserBadge userName={message.sender === 100112 ? 'Брокер' : 'Клиент'} /><Message isReceived={message.sender !== 100112} timestamp={message.timestamp} text={message.text} /></div>)}
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;