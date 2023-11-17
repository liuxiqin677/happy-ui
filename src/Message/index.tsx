import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useCssClassManager } from '../../common/hook';
import ErrorIcon from '../../components/ErrorIcon';
import InfoIcon from '../../components/InfoIcon';
import SuccessIcon from '../../components/SuccessIcon';
import WarningIcon from '../../components/WarningIcon';
import { uuid } from '../utils';
import './index.less';
import {
  BaseMessageOptions,
  IBaseMessageObjecProps,
  IMessageProps,
  MessageOptions,
  messageQueueItem,
} from './interface';

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
  const {
    type,
    content,
    id,
    duration = 3,
    style,
    icon,
    className = '',
  } = props;

  const refMessage = useRef<HTMLDivElement>();
  const timerRef = useRef<NodeJS.Timeout>();

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

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        handleHidden();
      }, duration * 1000);
    }
  }, [duration]);

  return (
    <div
      ref={refMessage as React.RefObject<HTMLDivElement>}
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
const Message: IBaseMessageObjecProps = {
  info: (config: IMessageProps) => addMessage({ type: 'info', ...config }),
  warn: (config: IMessageProps) => addMessage({ type: 'warning', ...config }),
  error: (config: IMessageProps) => addMessage({ type: 'error', ...config }),
  success: (config: IMessageProps) =>
    addMessage({ type: 'success', ...config }),
  update: (config: IMessageProps) => updateMessage(config),
  open: (config: MessageOptions) =>
    addMessage({ ...config, type: config.type ? config.type : 'info' }),
};

export default Message;
