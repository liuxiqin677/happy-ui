import React, { FC } from 'react';
import './index.less';
import { IBreadcrumbItemProps } from './interface';

const BreadcrumbItem: FC<IBreadcrumbItemProps> = ({ children }) => {
  return <div className="happy-breadcrumb-item">{children}</div>;
};

export default BreadcrumbItem;
