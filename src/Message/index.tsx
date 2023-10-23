import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorIcon from '../../components/ErrorIcon';
import InfoIcon from '../../components/InfoIcon';
import SuccessIcon from '../../components/SuccessIcon';
import WarningIcon from '../../components/WarningIcon';
import { useCssClassManager } from './hooks';
import { uuid } from '../utils';
import './index.less';

export type messageType = 'info' | 'warning' | 'error' | 'success';

export type messageInput = (message: IMessageProps) => void;

export interface IMessageProps {
  className?: string;
  content?: ReactNode;
  duration?: number;
  icon?: ReactNode;
  style?: CSSProperties;
  key?: string | number;
}

export interface messageQueueItem extends IMessageProps {
  id: string;
}

export interface MessageOptions extends IMessageProps {
  type: messageType;
}

export interface BaseMessageOptions extends MessageOptions {
  id: string;
}

export interface propsMessage {
  info: messageInput;
  warn: messageInput;
  error: messageInput;
  success: messageInput;
  update: messageInput;
}

const CONTAINER_ID = 'happy-message-container';
const MESSAGE_QUEUE: Array<messageQueueItem> = [];

// 创建容器
function createContainer() {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', CONTAINER_ID);
    document.body.appendChild(container);
  }
  return container;
}

// 新增消息
function addMessage(params: MessageOptions) {
  const id = uuid();
  MESSAGE_QUEUE.push({ ...params, id });
  renderMessage([...MESSAGE_QUEUE]);
}

// 组件渲染
let containerRoot: any;
function renderMessage(messageQueue: Array<any>) {
  const container = createContainer();
  if (!containerRoot) {
    containerRoot = createRoot(container);
  }

  const MessageComponents = messageQueue.map((props) => {
    return <BaseMessage {...props} key={props.id} />;
  });

  containerRoot.render(MessageComponents);
}

// 移除消息
function removeMessage(id: string) {
  const position = MESSAGE_QUEUE.findIndex((item) => item.id === id);
  MESSAGE_QUEUE.splice(position, 1);
  renderMessage([...MESSAGE_QUEUE]);
}

// 更新消息
function updateMessage(config: IMessageProps) {
  const position = MESSAGE_QUEUE.findIndex((item) => item?.key === config?.key);
  if (position === -1) return;
  const newFilter = { ...MESSAGE_QUEUE[position], ...config };
  MESSAGE_QUEUE.splice(position, 1, newFilter);
  renderMessage([...MESSAGE_QUEUE]);
}

// Message 组件
function BaseMessage(props: BaseMessageOptions) {
  const { type, content, id, duration, style, icon, className = '' } = props;

  const refMessage = useRef<any>();

  const classMap = {
    base: '',
    visible: 'happy-message-visible',
    hidden: 'happy-message-hidden',
  };

  const { addClassName, classList } = useCssClassManager(classMap);

  const clear = () => removeMessage(id);
  const handleHidden = () => {
    if (refMessage.current) {
      refMessage.current.addEventListener('animationend', clear, {
        once: true,
      });
    }
    addClassName('hidden');
  };

  useEffect(() => {
    if (duration !== 0) {
      addClassName('visible');

      setTimeout(
        () => {
          handleHidden();
        },
        duration ? duration * 1000 : 3000,
      );
    }
  }, []);

  return (
    <div
      ref={refMessage}
      className={`happy-message happy-message-${type} ${classList} ${className}`}
      style={style}
    >
      <div className="happy-message-content">
        <span className="happy-message-icon">
          {type === 'info' && (icon ? icon : <InfoIcon />)}
          {type === 'warning' && (icon ? icon : <WarningIcon />)}
          {type === 'error' && (icon ? icon : <ErrorIcon />)}
          {type === 'success' && (icon ? icon : <SuccessIcon />)}
        </span>
        <span>{content}</span>
      </div>
    </div>
  );
}

// 对外导出的 api
const Message: propsMessage = {
  info: (config: IMessageProps) => addMessage({ type: 'info', ...config }),
  warn: (config: IMessageProps) => addMessage({ type: 'warning', ...config }),
  error: (config: IMessageProps) => addMessage({ type: 'error', ...config }),
  success: (config: IMessageProps) =>
    addMessage({ type: 'success', ...config }),
  update: (config: IMessageProps) => updateMessage(config),
};

export default Message;
