import React, { FC } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Image from '../image';
import styles from './avatar.module.scss';
import { generateIdGradient, generateInitials } from './utils';

interface Props {
  user?: Optional<User>;
  className?: Optional<string>;
  color?: string;
  gradientSeed?: string;
  imageSrc?: string;
  text?: string;
  iconKey?: string;
  isSmallIcon?: boolean;
}

const Avatar: FC<Props> = (props) => {
  const {
    user,
    className,
    color,
    gradientSeed,
    imageSrc,
    iconKey,
    text,
    isSmallIcon,
    ...otherProps
  } = props;

  const username =
    user?.name || user?.displayName || user?.email || user?.phoneNumber || null;
  const anonymousUser = user && [null, 'anonymous'].indexOf(username) > -1;

  let content = null;
  if (imageSrc) {
    content = <ImageAvatar src={imageSrc} />;
  } else if (user?.avatarUrl) {
    content = <ImageAvatar src={user.avatarUrl} alt={user.name || ''} />;
  } else if (iconKey) {
    content = <IconAvatar name={iconKey} />;
  } else if (user === null) {
    content = <IconAvatar name="user-slash" />; // Unassigned
  } else if (anonymousUser) {
    content = <IconAvatar name="user-secret" />; // Anonymous user
  } else if (text) {
    content = <TextAvatar text={text} />;
  } else if (username) {
    content = <TextAvatar text={generateInitials(username)} />;
  }

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  if (color) {
    styleOverrides.background = color;
  } else if (gradientSeed) {
    styleOverrides.background = generateIdGradient(gradientSeed);
  } else if (user === null || anonymousUser) {
    styleOverrides.background = '#CACACA';
  } else if (user && !user?.avatarUrl) {
    styleOverrides.background = generateIdGradient(user.id);
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: styleOverrides.background,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {content}
    </div>
  );
};

const ImageAvatar: FC<{ src: string; alt?: string }> = (props) => (
  <Image className={styles.image} {...props} />
);

const IconAvatar: FC<{ name: string }> = (props) => (
  <Icon className={styles.icon} {...props} />
);

const TextAvatar: FC<{ text: string }> = ({ text }) => (
  <span className={styles.text}>{text}</span>
);

export default Avatar;
