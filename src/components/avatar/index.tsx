import React, { FC } from 'react';
import classnames from 'classnames';
import { TextAvatar, IconAvatar, ImageAvatar } from './avatar.types';
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

  const userName =
    user?.name || user?.displayName || user?.email || user?.phoneNumber || null;
  const isAnonymousUser = user && [null, 'anonymous'].indexOf(userName) > -1;

  const isImageAvatar = imageSrc || user?.avatarUrl;
  const isIconAvatar = iconKey;
  const isTextAvatar = text || (userName && generateInitials(userName));
  const isUnassignedOrAnonymousAvatar = user === null || isAnonymousUser;

  let content = null;
  let background = null;

  if (isImageAvatar) {
    content = <ImageAvatar src={isImageAvatar} alt={user?.name || ''} />;
    background = '';
  } else if (isIconAvatar) {
    content = <IconAvatar name={isIconAvatar} />;
    background = color;
  } else if (isTextAvatar) {
    content = <TextAvatar text={isTextAvatar} />;
    background = generateIdGradient(gradientSeed || user?.id || '');
  } else if (isUnassignedOrAnonymousAvatar) {
    content = (
      <IconAvatar name={isAnonymousUser ? 'user-secret' : 'user-slash'} />
    );
    background = '#CACACA';
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: background,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  const styleOverrides: Record<string, unknown> = { background };

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {content}
    </div>
  );
};

export default Avatar;
