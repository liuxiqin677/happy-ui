import cs from 'classnames';
import React, { FC, useContext, useEffect, useMemo, useRef } from 'react';
import AvatarGroup, { AvatarGroupContext } from './Group/Group';
import './index.less';
import { IAvatarProps } from './interface';

const InternalAvatar: FC<IAvatarProps> = ({
  children,
  className,
  style = {},
  size = 40,
  autoFixFontSize = true,
  triggerType = 'button',
  triggerIcon,
  shape = 'circle',
  triggerClick,
}) => {
  const { size: GroupContextSize, groupStyle } = useContext(AvatarGroupContext);
  const textRef = useRef(null);
  const classNames = useMemo(() => {
    return cs({
      'happy-avatar': true,
      'happy-avatar-circle': shape === 'circle',
      'happy-avatar-square': shape === 'square',
      className,
    });
  }, [shape]);

  const autoFixFontSizeHandler = () => {
    if (autoFixFontSize) {
      // 如果用户配置了文本自适应
      if (textRef.current) {
        const textDomWidth = (textRef.current as HTMLElement).clientWidth;
        const avatarSize = GroupContextSize || size || 40;
        if (textDomWidth - avatarSize > 0) {
          // 文本不够，需要自适应
          (textRef.current as HTMLElement).style.transform = `scale(${
            1 - (textDomWidth - avatarSize + 25) / 100
          })`;
        }
      }
    }
  };

  const handleClick = () => {
    triggerClick && triggerClick();
  };

  useEffect(() => {
    autoFixFontSizeHandler();
  }, []);

  return (
    <div
      className={classNames}
      style={{
        ...{
          ...groupStyle,
          width: `${GroupContextSize || size || 40}px`,
          height: `${GroupContextSize || size || 40}px`,
        },
        ...style,
      }}
    >
      {children && (children as any).type === 'img' ? (
        children
      ) : (
        <div ref={textRef} className="text-ref">
          {children}
        </div>
      )}
      {
        // 按钮式dialog
        triggerType === 'button' && triggerIcon && (
          <div className="button-dialog" onClick={handleClick}>
            {triggerIcon}
          </div>
        )
      }
      {
        // 内嵌式dialog
        triggerType === 'mask' && triggerIcon && (
          <div className="dialog">
            <div className="icon" onClick={handleClick}>
              {triggerIcon}
            </div>
          </div>
        )
      }
    </div>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<IAvatarProps> & {
  Group: typeof AvatarGroup;
};

const Avatar = InternalAvatar as CompoundedComponent;
Avatar.Group = AvatarGroup;

export default Avatar;
