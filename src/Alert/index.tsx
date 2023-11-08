import cs from 'classnames';
import React, { ReactNode, useMemo, useState } from 'react';
import ErrorIcon from '../../components/ErrorIcon';
import InfoIcon from '../../components/InfoIcon';
import SuccessIcon from '../../components/SuccessIcon';
import WarningIcon from '../../components/WarningIcon';
import './index.less';

const DefaultCloseIcon = () => (
  <svg
    fillRule="evenodd"
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
  </svg>
);

export type TAlertType = 'success' | 'info' | 'warning' | 'error';

export interface IAlertProps {
  icon?: ReactNode;
  type?: TAlertType;
  message?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode | boolean;
  showIcon?: boolean;
  banner?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Alert: React.FC<IAlertProps> = ({
  icon,
  banner = false,
  type = banner === true ? 'warning' : 'info', // banner 时默认是 warning
  message = '',
  description,
  action,
  closable = false,
  closeIcon = false,
  showIcon = false,
  onClose,
}) => {
  const [destroy, setDestroy] = useState<boolean>(false);
  const [destroyClass, setDestroyClass] = useState<boolean>(false);

  const containerClass = useMemo(() => {
    return cs({
      'happy-alert': true,
      'happy-alert-success': type === 'success',
      'happy-alert-warning': type === 'warning',
      'happy-alert-error': type === 'error',
      'happy-alert-info': type === 'info',
      'happy-alert-with-description': description,
      'happy-alert-banner': banner,
      'happy-alert-destroy': destroyClass,
    });
  }, [type, destroyClass, banner, description]);

  const defaultTypeIcon = useMemo(() => {
    if (icon) return icon;
    return type === 'success' ? (
      <SuccessIcon />
    ) : type === 'warning' ? (
      <WarningIcon />
    ) : type === 'error' ? (
      <ErrorIcon />
    ) : type === 'info' ? (
      <InfoIcon />
    ) : null;
  }, [type, icon]);

  return !destroy ? (
    <div className={containerClass}>
      {showIcon && <span className="happy-alert-icon">{defaultTypeIcon}</span>}
      <div className="happy-alert-content">
        <div className="happy-alert-message">{message}</div>
        {description && (
          <div className="happy-alert-description">{description}</div>
        )}
      </div>
      {action && <div className="happy-alert-action">{action}</div>}
      {closable && (
        <button
          type="button"
          className="happy-alert-close-icon"
          onClick={(e) => {
            setDestroyClass(true);
            setTimeout(() => {
              setDestroy(true);
              onClose?.(e);
            }, 500);
          }}
        >
          <span className="action action-close">
            {closeIcon ? closeIcon : <DefaultCloseIcon />}
          </span>
        </button>
      )}
    </div>
  ) : null;
};

export default Alert;
