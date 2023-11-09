import cs from 'classnames';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../components/CloseIcon';
import ErrorIcon from '../../components/ErrorIcon';
import InfoIcon from '../../components/InfoIcon';
import SuccessIcon from '../../components/SuccessIcon';
import WarningIcon from '../../components/WarningIcon';
import Button from '../Button';
import './index.less';
import { IModalProps } from './interface';

let hiddenCount = 0;

const Modal: React.FC<IModalProps> = ({
  afterClose,
  className = '',
  styles,
  style,
  type = 'confirm',
  cancelButtonProps,
  cancelText = 'Cancel',
  centered = false,
  closeIcon = <CloseIcon />,
  confirmLoading = false,
  mask = true,
  maskClosable = true,
  okButtonProps,
  okText = 'OK',
  okType = 'primary',
  title,
  open = false,
  width = 520,
  onCancel,
  onOk,
  footer,
  destroyOnClose = false,
  children,
}) => {
  const [destroyChild, setDestroyChild] = useState<boolean>(false);

  const handleModal = (cb?: () => any) => {
    cb?.();
    if (destroyOnClose) {
      setDestroyChild(true);
    }
    // 多层 modal 时，当只有最后一个弹窗时，才设置 overflow
    if (document.querySelectorAll('.happy-modal-root-visible').length === 1) {
      document.body.style.overflow = 'auto';
    }
  };

  // 关闭回调
  const handleClose = () => {
    handleModal(onCancel);
  };

  // 按照 esc 关闭弹窗
  const handleCloseByEscKeyCode = function (event: KeyboardEvent) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode === 27) {
      handleClose();
    }
  };

  // 确认回调
  const handleOk = () => {
    handleModal(onOk);
  };

  const modalClassName = useMemo(() => {
    return cs({
      'happy-modal': true,
      'happy-modal-centered': centered,
    });
  }, [centered]);

  const modalStyle = useMemo(() => {
    return {
      width: `${width}px`,
      transformOrigin: `5.5px 411px`,
      ...(!open ? { display: 'none' } : {}),
    };
  }, [open]);

  const titleIcon = useMemo(() => {
    if (type === 'confirm') {
      return null;
    } else if (type === 'warning') {
      return <WarningIcon />;
    } else if (type === 'error') {
      return <ErrorIcon />;
    } else if (type === 'success') {
      return <SuccessIcon />;
    } else {
      return <InfoIcon />;
    }
  }, [type]);

  const footers = useMemo(() => {
    return footer
      ? footer
      : [
          <Button
            key="cancel"
            onClick={() => {
              // onCancel?.();
              // afterClose?.();
              handleClose();
            }}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>,
          <Button
            type={okType}
            key="confirm"
            onClick={() => {
              // onOk?.();
              // afterClose?.();
              handleOk();
            }}
            loading={confirmLoading}
            {...okButtonProps}
          >
            {okText}
          </Button>,
        ];
  }, [footer]);

  useEffect(() => {
    if (open) {
      setDestroyChild(false);
      document.body.style.overflow = 'hidden';
    }
    if (!open && hiddenCount) {
      hiddenCount = 0;
      afterClose?.();
    }
    hiddenCount = 1;
  }, [open]);

  // 按 ESC 时关闭弹窗
  useEffect(() => {
    document.addEventListener('keydown', handleCloseByEscKeyCode, false);
    return () => {
      document.removeEventListener('keydown', handleCloseByEscKeyCode, false);
    };
  }, []);

  return createPortal(
    <>
      <div
        className={`happy-modal-root ${open ? 'happy-modal-root-visible' : ''}`}
        style={open ? {} : { display: 'none' }}
      >
        {mask && (
          <div
            className="happy-modal-mask"
            style={styles?.mask}
            onClick={() => {
              if (maskClosable) {
                handleClose();
              }
            }}
          ></div>
        )}
        <div
          role={'dialog'}
          aria-labelledby=":rdq:"
          aria-modal="true"
          className={`${modalClassName} ${className}`}
          style={{
            ...modalStyle,
            ...style,
          }}
        >
          <div
            tabIndex={0}
            aria-hidden="true"
            style={{
              width: '0px',
              height: '0px',
              overflow: 'hidden',
              outline: 'none',
            }}
          ></div>
          {!destroyChild && (
            <div className="happy-modal-content">
              {/* 关闭弹窗icon */}
              {closeIcon && (
                <button
                  type="button"
                  aria-label="Close"
                  className="happy-modal-close"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <div className="happy-modal-close-x">
                    <span
                      role="img"
                      aria-label="close"
                      className="action action-close happy-modal-close-icon"
                    >
                      {closeIcon}
                    </span>
                  </div>
                </button>
              )}
              {/* title */}
              {title && (
                <div
                  className="happy-modal-header"
                  style={titleIcon ? { display: 'flex' } : {}}
                >
                  {titleIcon && (
                    <div className="happy-modal-title-icon">{titleIcon}</div>
                  )}
                  <div className="happy-modal-title" style={styles?.header}>
                    {title}
                  </div>
                </div>
              )}
              {/* body */}
              <div className="happy-modal-body" style={styles?.body}>
                {children}
              </div>
              {/* footer */}
              {footers ? (
                <div className="happy-modal-footer" style={styles?.footer}>
                  {footers.map((item: ReactNode) => item)}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          <div
            tabIndex={0}
            aria-hidden="true"
            style={{
              width: '0px',
              height: '0px',
              overflow: 'hidden',
              outline: 'none',
            }}
          ></div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
