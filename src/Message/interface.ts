import { CSSProperties, ReactNode } from 'react';
type messageType = 'info' | 'warning' | 'error' | 'success';

type messageInput = (message: IMessageProps) => void;

type InfoMessageInput = (message: MessageOptions) => void;

interface IMessageProps {
  className?: string;
  content?: ReactNode;
  duration?: number;
  icon?: ReactNode;
  style?: CSSProperties;
  key?: string | number;
}

interface messageQueueItem extends IMessageProps {
  id: string;
}

interface MessageOptions extends IMessageProps {
  type?: messageType;
}

interface BaseMessageOptions extends MessageOptions {
  id: string;
}

interface IBaseMessageObjecProps {
  info: messageInput;
  warn: messageInput;
  error: messageInput;
  success: messageInput;
  update: messageInput;
  open: InfoMessageInput;
}

export {
  BaseMessageOptions,
  IBaseMessageObjecProps,
  IMessageProps,
  InfoMessageInput,
  MessageOptions,
  messageInput,
  messageQueueItem,
  messageType,
};
