/*
 * @Author: liuxiqin
 * @Date: 2023-10-08 15:34:57
 * @LastEditTime: 2023-10-08 15:34:57
 * @LastEditors: liuxiqin
 * @Description:
 */

/**
 * 创建一个 div，设置样式，加到 body 下，看看 scrollHeight 是多少，最后把这个元素删掉。
 * 这样就能判断是是否支持 gap、column 等样式，因为不支持的话高度会是 0。 支持的话 scrollHeight === 1
 */
let flexGapSupported: boolean | undefined;
export const detectFlexGapSupported = () => {
  if (flexGapSupported !== undefined) {
    return flexGapSupported;
  }

  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  flexGapSupported = flex.scrollHeight === 1;
  document.body.removeChild(flex);

  return flexGapSupported;
};
