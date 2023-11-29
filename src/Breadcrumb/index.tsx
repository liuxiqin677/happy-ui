import cs from 'classnames';
import React, { Children, FC, Fragment, useMemo } from 'react';
import BreadcrumbItem from './Item';
import './index.less';
import { IBreadcrumbProps } from './interface';

const InternalBreadcrumb: FC<IBreadcrumbProps> = ({
  className = '',
  style = {},
  separator = '/',
  children,
}) => {
  const childrenList = Children.toArray(children);

  const breadcrumbClass = cs({
    'happy-breadcrumb': true,
  });

  const renderBreadcrumb = useMemo(() => {
    // 截取 maxcount 以内的面包屑
    return childrenList.map((child, index) => {
      return (
        <Fragment key={index}>
          {child}
          {index !== childrenList.length - 1 && (
            <span className="happy-breadcrumb-item-separator">{separator}</span>
          )}
        </Fragment>
      );
    });
  }, [childrenList, children]);

  return (
    <div className={`${breadcrumbClass} ${className}`} style={style}>
      {renderBreadcrumb}
    </div>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<IBreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
};

const Breadcrumb = InternalBreadcrumb as CompoundedComponent;
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
