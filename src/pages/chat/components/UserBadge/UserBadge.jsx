import React from 'react';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import styles from "./UserBadge.module.css";

const UserBadge = ({userName}) => {
  return (
    <div className={styles.userBadge}>
      <Avatar size="md" icon={<UserOutlined />} />
      <p className={styles.userName}>{userName}</p>
    </div>
  );
};

export default UserBadge;