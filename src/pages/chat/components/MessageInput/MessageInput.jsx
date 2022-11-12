import React from 'react';
import { Button, Input } from 'antd';
import styles from './MessageInput.module.css';

const MessageInput = () => {
  return (
    <div>
      <Input.Group size="large" compact={true} className={styles.inputContainer}>
        <Input placeholder="Написать сообщение..." size="large" />
        <Button type="primary" size="large">Отправить</Button>
      </Input.Group>
    </div>
  );
};

export default MessageInput;