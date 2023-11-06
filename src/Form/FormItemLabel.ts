export default class FormItemLabel {
  layout: string; //表单项标签布局形式
  constructor(layout: string) {
    this.layout = layout;
  }
  getStyle() {
    return {
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
          textAlign: 'left',
          marginBottom: '12px'
        };
        break;
    }
    return layoutStyle;
  }
}
