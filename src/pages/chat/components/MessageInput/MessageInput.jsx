import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import styles from './MessageInput.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendingStatus, sendMessage } from '../../../../features/chat/chatSlice';

const MessageInput = () => {
  const [inputText, setInputText] = useState('')

  const dispatch = useDispatch()
  const sendingStatus = useSelector(selectSendingStatus)

  useEffect(() => {
      if (sendingStatus === 'idle') {
        setInputText('')
      }
    },
    [sendingStatus])

  function handleButtonClick() {
    if (inputText.length) {
      dispatch(sendMessage(inputText))
    }
  }

  return (
    <div>
      <Input.Group size="large" compact={true} className={styles.inputContainer}>
        <Input disabled={sendingStatus === 'sending'} placeholder="Написать сообщение..." size="large"
               onChange={e => setInputText(e.target.value)} value={inputText} onPressEnter={handleButtonClick} />
        <Button disabled={sendingStatus === 'sending'} type="primary" size="large"
                onClick={handleButtonClick}>Отправить</Button>
      </Input.Group>
    </div>
  );
};

export default MessageInput;