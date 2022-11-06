import React, { FC } from 'react';
import classnames from 'classnames';

import styles from './spinner.module.scss';

interface Props {
  className?: Optional<string>;
  size?: number;
  color?: string;
}

const Spinner: FC<Props> = (props) => {
  const { className, size, color, ...otherProps } = props;

  const rootClass = classnames(
    {
      [styles.root]: true,
    },
    className,
  );

  const sizeValue = size && Number.isSafeInteger(size) ? size : 32;
  const style: Record<string, string> = {
    width: `${sizeValue}px`,
    borderWidth: `${Math.max(Math.floor(sizeValue / 10), 1)}px`,
  };

  if (typeof color === 'string' && color.length) {
    style.borderTopColor = color;
  }

  return <div {...otherProps} style={style} className={rootClass} />;
};

export default Spinner;
