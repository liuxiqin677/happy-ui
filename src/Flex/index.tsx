import cs from 'classnames';
import React, { CSSProperties, FC, ReactNode, memo, useMemo } from 'react';
import './index.less';

// flex 单值时的全局值
const flexSingleGlobals: string[] = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'none',
];
// flex-basis 的尺寸关键词
const flexBasisKeyWords: string[] = [
  'auto',
  'fill',
  'content',
  'max-content',
  'min-content',
  'fit-content',
];
/**
 * 校验是否是 flex-grow 的有效值
 * @param str
 * @returns
 */
const isFlexGrow = (str: string): boolean => {
  return /^([1-9]+(\.\d+)?)|([0](\.\d+)?)$/.test(str);
};
/**
 * 校验是否是 flex-basis 的有效值
 * @param str
 * @returns
 */
const isFlexBasis = (str: string): boolean => {
  // 如果传入的 flex-basis 是 尺寸关键词
  if (flexBasisKeyWords.includes(str)) {
    return true;
  }
  const regs = [
    'px',
    'in',
    'cm',
    'mm',
    'pt',
    'pc',
    'em',
    'rem',
    'ex',
    'vh',
    'vw',
    'vmin',
    'vmax',
    '%',
    'fr',
  ];
  const splitArr = str.split(/[0-9]/);
  const currentReg = splitArr[splitArr.length - 1];
  if (currentReg) {
    return regs.includes(currentReg);
  } else {
    return false;
  }
};
/**
 * 校验是否是 flex-shrink 的有效值
 * @param str
 * @returns
 */
const isFlexShrink = (str: string): boolean => {
  return /^([1-9]+(\.\d+)?)|([0](\.\d+)?)$/.test(str);
};

export interface IFlexProps {
  vertical?: boolean;
  wrap?: string;
  justify?: string;
  align?: string;
  flex?: string;
  gap?: 'small' | 'middle' | 'large' | string | number;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Flex: FC<IFlexProps> = ({
  vertical = false,
  wrap = 'nowrap',
  justify = 'normal',
  align = 'normal',
  flex = '',
  gap,
  style = {},
  className = '',
  children,
}) => {
  /**
   * 单值语法检验
   * @param single
   * @returns
   */
  const validateSingleValued = (single: string): CSSProperties => {
    // 如果只包含数值，说明此时传入的是 flex-grow 属性的有效值，此时简写会扩展为 flex: <flex-grow> 1 0。
    // 比如: flex: 1
    if (isFlexGrow(single)) {
      return {
        flex: `${single} 1 0%`,
      };
    } else if (isFlexBasis(single)) {
      // 如果传入的是带单位的数字，或者是 flex-basis 的尺寸关键词时，此时是 flex-basis 的有效值，此时拓展为： flex: 1 1 <flex-basis>
      // 比如：flex: 3em 、flex: max-content
      return single !== 'fill' &&
        single !== 'content' &&
        single !== 'none' &&
        single !== 'auto'
        ? {
            flex: `1 1 ${single}`,
          }
        : single === 'none'
        ? {
            flex: '0 0 auto',
          }
        : single === 'auto'
        ? {
            flex: '1 1 auto',
          }
        : {};
    } else if (flexSingleGlobals.includes(single)) {
      // 如果传入的是 单值时的 全局值，如：flex: 'inherit'
      return {
        flex: single !== 'none' ? `${single}` : '0 0 auto',
      };
    } else {
      return {};
    }
  };
  /**
   * 双值语法检验
   * @param grow 传入的 flex-grow 值
   * @param second 传入的 flex-basis 或者 flex-shrink 的有效值
   * @returns
   */
  const validateDoubleValued = (
    grow: string,
    second: string,
  ): CSSProperties => {
    // 首先，第一个值必须是 flex-grow 的有效值，此时必须是 number，值是 [0, 正无穷]，负值无效，默认为 0
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow
    if (!isFlexGrow(grow)) {
      return {};
    } else if (isFlexBasis(second)) {
      // 第二个值必须是 flex-basis 的有效值 或者是 flex-shrink 的有效值
      // 此时拓展为： flex: <flex-grow> 1 <flex-basis> 或者 flex: <flex-grow> <flex-shrink> 0
      return {
        flex: `${grow} 1 ${second}`,
      };
    } else if (isFlexShrink(second)) {
      return {
        flex: `${grow} ${second} 0%`,
      };
    } else {
      return {};
    }
  };
  /**
   * 三值语法检验
   * @param grow 传入的 flex-grow 值
   * @param basis 传入的 flex-basis 值
   * @param shrink 传入的 flex-shrink 值
   * @returns
   */
  const validateTernaryValued = (
    grow: string,
    basis: string,
    shrink: string,
  ): CSSProperties => {
    // 按照 flex-grow flex-shrink flex-basis 的顺序校验是否合法
    return isFlexGrow(grow) && isFlexShrink(shrink) && isFlexBasis(basis)
      ? {
          flex: `${grow} ${shrink} ${basis}`,
        }
      : {};
  };

  const flexWrapperClass = useMemo(() => {
    return cs({
      'happy-flex': true,
      'happy-flex-vertical': vertical,
      'happy-flex-gap-middle': gap === 'middle',
      'happy-flex-gap-small': gap === 'small',
      'happy-flex-gap-large': gap === 'large',
      'happy-flex-justify-right': justify === 'right',
      'happy-flex-justify-left': justify === 'left',
      'happy-flex-justify-normal': justify === 'normal',
      'happy-flex-justify-start': justify === 'start',
      'happy-flex-justify-end': justify === 'end',
      'happy-flex-justify-flex-start': justify === 'flex-start',
      'happy-flex-justify-flex-center': justify === 'center',
      'happy-flex-justify-flex-end': justify === 'flex-end',
      'happy-flex-justify-space-between': justify === 'space-between',
      'happy-flex-justify-space-evenly': justify === 'space-evenly',
      'happy-flex-justify-space-around': justify === 'space-around',
      'happy-flex-justify-stretch': justify === 'stretch',
      'happy-flex-align-normal': align === 'normal',
      'happy-flex-align-flex-end': align === 'flex-end',
      'happy-flex-align-flex-center': align === 'center',
      'happy-flex-align-flex-start': align === 'flex-start',
      'happy-flex-align-stretch': align === 'stretch',
      'happy-flex-align-start': align === 'start',
      'happy-flex-align-end': align === 'end',
      'happy-flex-align-self-start': align === 'self-start',
      'happy-flex-align-self-end': align === 'self-end',
      'happy-flex-align-baseline': align === 'baseline',
      'happy-flex-wrap-wrap': wrap === 'wrap',
      'happy-flex-wrap-nowrap': wrap === 'nowrap',
      'happy-flex-wrap-wrap-reverse': wrap === 'wrap-reverse',
    });
  }, [vertical, gap, justify, align, wrap]);

  const gapStyle = useMemo(() => {
    return typeof gap === 'number' ? { gap: `${gap}px` } : {};
  }, [gap]);

  // 语法校验：https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#%E8%AF%AD%E6%B3%95
  const flexStyle = useMemo(() => {
    // 根据 flexLength，去做单值语法、双值语法、三值语法的校验
    const flexLength = flex && flex !== '' ? flex.split(' ').length : 0;
    // 如果 flex 无效
    if (!flexLength) return {};
    // 校验 flex
    if (flexLength === 1) {
      return validateSingleValued(flex.split(' ')[0]);
    } else if (flexLength === 2) {
      return validateDoubleValued(flex.split(' ')[0], flex.split(' ')[1]);
    } else {
      return validateTernaryValued(
        flex.split(' ')[0],
        flex.split(' ')[2],
        flex.split(' ')[1],
      );
    }
  }, [flex]);

  return (
    <div
      style={{ ...gapStyle, ...flexStyle, ...style }}
      className={`${flexWrapperClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default memo(Flex);
