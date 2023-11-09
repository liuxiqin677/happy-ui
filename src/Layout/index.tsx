import React, { FC, useMemo } from 'react';
import ContentComponent from './components/Content';
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header';
import SiderComponent from './components/Sider';
import './index.less';
import { layoutProps } from './interface';

const InternalLayout: FC<layoutProps> = (props) => {
  const { children, extraStyle } = props;

  const propsStyles = useMemo(() => {
    if (extraStyle) {
      return extraStyle;
    }
    return {};
  }, [extraStyle]);

  return (
    <div className="happy-layout" style={propsStyles}>
      {children}
    </div>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<layoutProps> & {
  Content: typeof ContentComponent;
  Header: typeof HeaderComponent;
  Sider: typeof SiderComponent;
  Footer: typeof FooterComponent;
};

const Layout = InternalLayout as CompoundedComponent;

Layout.Content = ContentComponent;
Layout.Header = HeaderComponent;
Layout.Sider = SiderComponent;
Layout.Footer = FooterComponent;

export default Layout;
