export default class FormItemAttrs {
  wrapperCol: number; //底部距离
  wrapperTol: number; //顶部距离
  layout: string; //表单布局形式

  constructor(wrapperCol: number, wrapperTol: number, layout: string) {
    this.wrapperCol = wrapperCol;
    this.wrapperTol = wrapperTol;
    this.layout = layout;
  }
  getStyle() {
    return {
      marginBottom: `${24 + this.wrapperCol}px`,
      marginTop: `${24 + this.wrapperTol}px`,
      ...this.formatLayout(),
    };
  }
  formatLayout() {
    let layoutStyle = {};
    switch (this.layout) {
      case 'horizontal':
        layoutStyle = {};
        break;
      case 'vertical':
        layoutStyle = {
          flexDirection: 'column',
          alignItems: 'flex-start',
        };
        break;
    }
    return layoutStyle;
  }
}
