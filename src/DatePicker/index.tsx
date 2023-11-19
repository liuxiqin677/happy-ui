import cs from 'classnames';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import Button from '../Button/index';
import Input from '../Input/index';
import Popover from '../Popover/index';
import { IPopoverRef } from '../Popover/interface';
import './index.less';
import { IDatePickerProps } from './interface';

const DatePicker: FC<IDatePickerProps> = ({
  value = new Date(),
  width = 300,
  height = 250,
  style = {},
  className = '',
  startWeekDay = 'Sun',
  onChange,
}) => {
  const inputRef = useRef<any>(null);
  const popoverRef = useRef<IPopoverRef>(null);
  const monthNames: string[] = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];
  const defaultWeekDays: string[] = ['日', '一', '二', '三', '四', '五', '六'];
  const defaultWeekDaysMap = {
    Sun: '日',
    Mon: '一',
    Tue: '二',
    Wed: '三',
    Thu: '四',
    Fri: '五',
    Sat: '六',
  };
  const defaultWeekDaysIndexMap = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  const [date, setDate] = useState(value);
  /**
   * 上个月
   */
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  /**
   * 下个月
   */
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  /**
   * 获取当月的天数
   * @param year 当前年
   * @param month 当前月
   * @returns
   */
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  /**
   * 获取一个月的第一天
   * @param year 当前年
   * @param month 当前月
   * @returns
   */
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  /**
   * 计算头部星期渲染的排列顺序
   * @param index
   * @returns
   */
  const caculateWeekDaysDisplay = () => {
    const currentDisplayWeekDayIndex = defaultWeekDays.indexOf(
      defaultWeekDaysMap[startWeekDay],
    );
    return !currentDisplayWeekDayIndex
      ? defaultWeekDays
      : [
          ...defaultWeekDays.slice(currentDisplayWeekDayIndex, 7),
          ...defaultWeekDays.slice(0, currentDisplayWeekDayIndex),
        ];
  };

  /**
   * 定义头部星期的渲染顺序，默认是从周日开始排序
   * @returns
   */
  const renderDisplayWeekDays = useCallback(() => {
    const filterWeekDays = caculateWeekDaysDisplay();
    return filterWeekDays.map((item: string) => (
      <div key={item} className="happy-datepicker-item-day">
        {item}
      </div>
    ));
  }, [startWeekDay]);

  /**
   * 渲染日期
   * @returns
   */
  const renderDates = useCallback(() => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth()); //当月的天数
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth()); //当月的第一天是星期几

    // 渲染头部星期几时，需要配合 startWeekDay 指定的星期排序来生成多少个 empty
    const firstDayIndex = caculateWeekDaysDisplay().indexOf(
      defaultWeekDaysIndexMap[firstDay],
    );
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="happy-datepicker-item-empty"></div>,
      );
    }
    // 渲染日期
    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div
          key={i}
          className="happy-datepicker-item-day"
          onClick={() => {
            setDate(new Date(date.getFullYear(), date.getMonth(), i));
            inputRef.current.setCurrentValue(
              new Date(
                date.getFullYear(),
                date.getMonth(),
                i,
              ).toLocaleDateString(),
            );
            popoverRef.current?.setVisible(false);
            onChange?.(new Date(date.getFullYear(), date.getMonth(), i));
          }}
        >
          <div
            className={`happy-datepicker-inner-day ${
              i === date.getDate() ? 'happy-datepicker-inner-selected' : ''
            }`}
          >
            {i}
          </div>
        </div>,
      );
    }

    return days;
  }, [date, startWeekDay]);

  const datePickerClass = useMemo(() => {
    return cs({
      'happy-datepicker': true,
      className,
    });
  }, []);

  return (
    <Popover
      ref={popoverRef}
      style={{
        padding: 0,
      }}
      trigger="click"
      placement="bottom"
      content={
        <div
          className={datePickerClass}
          style={{
            width: `${typeof width === 'number' ? `${width}px` : width}`,
            height: `${typeof height === 'number' ? `${height}px` : height}`,
            ...style,
          }}
        >
          <div className="happy-datepicker-header">
            <Button onClick={handlePrevMonth}>&lt;</Button>
            <div>
              {date.getFullYear()}年{monthNames[date.getMonth()]}
            </div>
            <Button onClick={handleNextMonth}>&gt;</Button>
          </div>
          <div className="happy-datepicker-days">
            {renderDisplayWeekDays()}
            {renderDates()}
          </div>
        </div>
      }
    >
      <Input
        ref={inputRef}
        onClick={() => popoverRef.current?.setVisible(true)}
      />
    </Popover>
  );
};

export default DatePicker;
