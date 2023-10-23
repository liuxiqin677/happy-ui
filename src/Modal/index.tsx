/*
 * @Author: liuxiqin
 * @Date: 2023-10-16 10:19:20
 * @LastEditTime: 2023-10-17 14:36:53
 * @LastEditors: liuxiqin
 * @Description:
 */
import cs from 'classnames';
import Button, { ButtonType, IButtonProps } from 'happy-ui/Button';
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './index.less';

const CloseIcon = () => (
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

const WarningTitleIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="exclamation-circle"
    width="1em"
    height="1em"
    fill="rgb(250, 173, 20)"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
  </svg>
);

const ErrorTitleIcon = () => (
  <svg
    fillRule="evenodd"
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close-circle"
    width="1em"
    height="1em"
    fill="red"
    aria-hidden="true"
  >
    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
  </svg>
);

const SuccessTitleIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check-circle"
    width="1em"
    height="1em"
    fill="rgb(82, 196, 26)"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
  </svg>
);

const InfoTitleIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="info-circle"
    width="1em"
    height="1em"
    fill="rgb(22, 119, 255)"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
  </svg>
);

let hiddenCount = 0;

export type TModalType = 'confirm' | 'warning' | 'info' | 'error' | 'success';

export interface IModalProps {
  afterClose?: () => any;
  className?: string;
  styles?: {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
  };
  type?: TModalType;
  style?: CSSProperties;
  cancelButtonProps?: IButtonProps;
  cancelText?: ReactNode;
  centered?: boolean;
  closeIcon?: boolean | ReactNode;
  confirmLoading?: boolean;
  footer?: ReactNode[];
  mask?: boolean;
  maskClosable?: boolean;
  okButtonProps?: IButtonProps;
  okText?: ReactNode;
  okType?: ButtonType;
  title?: ReactNode;
  open?: boolean;
  width?: number;
  onCancel?: () => any;
  onOk?: () => any;
  destroyOnClose?: boolean;
  children?: ReactNode;
}

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

  // 关闭回调
  const handleClose = () => {
    if (destroyOnClose) {
      setDestroyChild(true);
    }
    onCancel?.();
  };

  // 确认回调
  const handleOk = () => {
    if (destroyOnClose) {
      setDestroyChild(true);
    }
    onOk?.();
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
      return <WarningTitleIcon />;
    } else if (type === 'error') {
      return <ErrorTitleIcon />;
    } else if (type === 'success') {
      return <SuccessTitleIcon />;
    } else {
      return <InfoTitleIcon />;
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

  // destroyOnClose 部分
  useEffect(() => {
    if (open) {
      if (destroyOnClose) {
        setDestroyChild(false);
      }
    }
  }, [open, destroyOnClose]);

  // afterClose 部分
  useEffect(() => {
    if (!open && hiddenCount) {
      hiddenCount = 0;
      afterClose?.();
    }
    hiddenCount = 1;
  }, [open]);

  return createPortal(
    <>
      <div className="happy-modal-root" style={open ? {} : { display: 'none' }}>
        {mask && (
          <div
            className="happy-modal-mask"
            style={styles?.mask}
            onClick={() => {
              if (maskClosable) {
                // onCancel?.();
                // afterClose?.();
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
                    // onCancel?.();
                    // afterClose?.();
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
