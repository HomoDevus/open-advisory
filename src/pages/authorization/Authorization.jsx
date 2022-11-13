import React from 'react';
import { Button, Form, Input, message } from 'antd';
import styles from './Authorization.module.css'
import { useDispatch } from 'react-redux';
import { authorize } from '../../features/chat/chatSlice';

const Authorization = () => {
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(authorize({ login: values.username, password: values.password }))

  };

  const onFinishFailed = (errorInfo) => {
    message.error('Неправильно введён логин или пароль')
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Пожалуйста введите своё имя пользователя!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Authorization;