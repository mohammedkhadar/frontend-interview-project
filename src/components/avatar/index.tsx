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

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let initials = '';
  let imageTag = null;
  let isBackground = false;
  let printIcon = null;

  if (imageSrc) {
    imageTag = <Image className={styles.image} src={imageSrc} />;
  } else if (color) {
    styleOverrides.backgroundColor = color;
    isBackground = true;
  } else if (gradientSeed) {
    styleOverrides.background = generateIdGradient(gradientSeed);
    isBackground = true;
  } else if (user) {
    if (user.avatarUrl) {
      imageTag = (
        <Image
          className={styles.image}
          src={user.avatarUrl}
          alt={user.name || ''}
        />
      );
    } else {
      styleOverrides.background = generateIdGradient(user.id);
      isBackground = true;
    }
  } else if (user === null) {
    // Unassigned
    printIcon = <Icon name="user-slash" className={styles.icon} />;
    styleOverrides.background = '#CACACA';
    isBackground = true;
  } else {
    styleOverrides.background = '#CACACA';
    isBackground = true;
  }

  if (text) {
    initials = text;
  } else if (user && !user.avatarUrl) {
    const seed =
      user.name || user.displayName || user.email || user.phoneNumber || null;
    if (seed === null || seed === 'anonymous') {
      // Anonymous user.
      printIcon = <Icon name="user-secret" className={styles.icon} />;
      styleOverrides.background = '#CACACA';
    } else {
      initials = generateInitials(seed);
    }
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {imageTag ||
        (!!initials && <span className={styles.text}>{initials}</span>) ||
        (!!iconKey && <Icon name={iconKey} className={styles.icon} />) ||
        printIcon}
    </div>
  );
};

export default Avatar;
