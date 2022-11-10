import React, { FC } from 'react';
import Icon from '../icon';
import Image from '../image';
import styles from './avatar.module.scss';

export const ImageAvatar: FC<{ src: string; alt?: string }> = (props) => (
  <Image className={styles.image} {...props} />
);

export const IconAvatar: FC<{ name: string }> = (props) => (
  <Icon className={styles.icon} {...props} />
);

export const TextAvatar: FC<{ text: string }> = ({ text }) => (
  <span className={styles.text}>{text}</span>
);
