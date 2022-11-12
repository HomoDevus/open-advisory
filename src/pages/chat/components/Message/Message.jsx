import React from 'react';
import styles from './Message.module.css';

const Message = ({ isReceived, text, date }) => {
  return (
    <div className={`${styles.message} ${isReceived ? styles.received : styles.sent}`}>
      <p className={styles.messageText}>{text}</p>
      <div className={styles.date}>{date.toLocaleString('ru-RU', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })}</div>
    </div>
  );
};

export default Message;