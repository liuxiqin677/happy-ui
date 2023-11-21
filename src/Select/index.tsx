import cs from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CloseIcon from '../../components/CloseIcon';
import DownOutlined from '../../components/DownOutlined';
import LoadingIncon from '../../components/LoadingIcon';
import UpOutlined from '../../components/UpOutlined';
import { ctx } from '../Form';
import './index.less';
import type { Options, SelectProps } from './interface';

const defaultColor = '#325dff';

const Select = React.forwardRef<unknown, SelectProps>(
  (
    {
      option,
      className,
      style,
      width = 180,
      placeholder,
      disabled,
      loading,
      showSearch,
      clearable,
      onSelect,
      onChange,
    },
    ref,
  ) => {
    const [selected, setSelected] = useState<string | number | any>('');
    const [selectedValue, setSelectedValue] = useState<string | number | any>(
      '',
    );
    const [visible, setVisible] = useState(false);
    const selectDom = useRef<any>(null);

    const formCtx: any = useContext(ctx);

    const classNames = useMemo(() => {
      return cs(className, `happy-select`, visible ? 'isChoose' : null);
    }, [visible]);

    useEffect(() => {
      // 用于监听Form组件的重置任务
      if (formCtx.reset) {
        setSelected('');
      }
    }, [formCtx.reset]);

    useEffect(() => {
      if (formCtx.submitStatus) {
        formCtx.getChildVal(selected);
      }
    }, [formCtx.submitStatus]);

    const toggleOptions = (e: any) => {
      // 切换下拉
      // e.stopPropagation();
      if (disabled || loading) return;
      setVisible(!visible);
    };

    const changeOptions = (v: Options, e: any) => {
      if (v.disabled) return;
      setVisible(false);
      setSelected(v.label);
      setSelectedValue(v.value);
      if (onSelect) {
        onSelect(v);
      }
    };

    const inputFilterOtpions = useMemo(() => {
      // 输入状态options过滤
      return option?.filter((item) => {
        return (item.label as string).includes(selected);
      });
    }, [option, selected]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // 输入后的回调
        setSelected(e.target.value);
        if (onChange) {
          onChange(e.target.value);
        }
      },
      [selected],
    );

    const clearSearchSelect = (e: React.SyntheticEvent) => {
      // e.stopPropagation();
      setSelectedValue('');
      setSelected('');
    };

    const selectClassName = useMemo(() => {
      return selected ? 'size' : 'placeholder';
    }, [selected]);

    return (
      <div
        className={classNames}
        style={{
          ...(width
            ? {
                width: `${width}px`,
              }
            : {}),
          ...style,
        }}
        ref={(node) => {
          selectDom.current = node;
        }}
        onClick={(e) => {
          // (showSearch ? null : toggleOptions)
          if (showSearch) return;
          toggleOptions(e);
        }}
      >
        <div
          className={cs(
            'selected',
            disabled || loading ? 'disabled-selected' : null,
          )}
        >
          {showSearch ? (
            <>
              <input
                type="text"
                className="selected"
                value={selected}
                placeholder={placeholder as string}
                onClick={toggleOptions}
                onChange={(e) => handleInputChange(e)}
              />
              {clearable ? (
                <div
                  style={{ fontSize: '12px', color: '#a19c9c' }}
                  onClick={clearSearchSelect}
                >
                  <CloseIcon />
                </div>
              ) : visible ? (
                <div
                  style={{ fontSize: '12px', color: '#a19c9c' }}
                  onClick={toggleOptions}
                >
                  <UpOutlined />
                </div>
              ) : (
                <div
                  style={{ fontSize: '12px', color: '#a19c9c' }}
                  onClick={toggleOptions}
                >
                  <DownOutlined />
                </div>
              )}
            </>
          ) : (
            <>
              <div className={selectClassName}>{selected || placeholder}</div>
              {loading ? (
                <div style={{ fontSize: '12px' }}>
                  <LoadingIncon color="rgba(0, 0, 0, 0.25)" />
                </div>
              ) : visible ? (
                <div
                  style={{ fontSize: '12px', color: '#a19c9c' }}
                  onClick={toggleOptions}
                >
                  <UpOutlined />
                </div>
              ) : (
                <div
                  style={{ fontSize: '12px', color: '#a19c9c' }}
                  onClick={toggleOptions}
                >
                  <DownOutlined />
                </div>
              )}
            </>
          )}
        </div>
        {visible && (
          <div
            className="selectOptions"
            style={{
              ...(width
                ? {
                    width: `${width}px`,
                  }
                : {}),
            }}
          >
            {(showSearch ? inputFilterOtpions : option)?.map((s: any) => {
              return (
                <div
                  key={s.label as any}
                  className={
                    s.value === selectedValue
                      ? `select-option ${s.disabled ? 'disabled-option' : ''}`
                      : `option ${s.disabled ? 'disabled-option' : ''}`
                  }
                  style={
                    s.disabled
                      ? ({
                          cursor: 'not-allowed',
                          '--line-disabled': '#000000',
                        } as any)
                      : ({
                          '--line-disabled': defaultColor,
                        } as any)
                  }
                  onClick={(e) => changeOptions(s as Options, e)}
                >
                  {s.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

export default Select;
