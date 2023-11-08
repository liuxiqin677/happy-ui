import cs from 'classnames';
import React, { CSSProperties, FC, ReactNode, createContext } from 'react';
import './index.less';

export interface IGroupProps {
  children?: ReactNode;
  className?: string;
  size?: number;
  groupStyle?: CSSProperties;
}

export const AvatarGroupContext = createContext<any>({} as any);

const AvatarGroup: FC<IGroupProps> = ({
  children,
  className,
  size,
  groupStyle,
}) => {
  const classNames = cs(className, 'happy-avatar-group');

  return (
    <div className={classNames}>
      <AvatarGroupContext.Provider
        value={{
          size,
          groupStyle,
        }}
      >
        {children}
      </AvatarGroupContext.Provider>
    </div>
  );
};

export default AvatarGroup;
