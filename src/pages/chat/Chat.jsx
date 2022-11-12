import React from 'react';
import styles from './Chat.module.css';
import Message from './components/Message/Message';
import MessageInput from './components/MessageInput/MessageInput';
import UserBadge from './components/UserBadge/UserBadge';

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.messagesContainer}>
        <UserBadge userName="Han Solo" />
        <Message isReceived={false} text={'Hi'} date={new Date()} />
        <UserBadge userName="Broker" />
        <Message isReceived={true} text={'Hello'} date={new Date()} />
        <Message isReceived={true}
                 text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius condimentum congue. Sed feugiat, dui a dictum rutrum, justo nisl posuere leo, eget euismod urna ex a elit. Vestibulum consectetur nibh semper sapien consectetur, non iaculis ligula ultrices. Quisque at leo magna. Nulla vulputate tortor dui, sed mattis leo molestie id. Donec quis venenatis leo. Nunc faucibus interdum nibh, bibendum placerat est sagittis ac. In vulputate vestibulum mauris ac volutpat. Phasellus blandit convallis urna vitae aliquam. Fusce vel eros dolor. Curabitur vehicula sollicitudin nisi ac maximus. Etiam nibh sem, suscipit lobortis purus vel, interdum interdum mauris.'}
                 date={new Date()} />
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;