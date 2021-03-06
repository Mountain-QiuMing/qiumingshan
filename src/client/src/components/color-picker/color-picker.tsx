import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { mergeProps } from '../../utils/merge-props';
import { colorPickerStyles } from './color-picker-styles';
import { transformColor, toRgb } from './color-transform';
import MoveContainer, { Position } from './move-container';
import { validHex } from './utils';

export interface ColorPickerProps {
  /**
   * @description.zh-CN 颜色值，默认使用 16 进制格式，可以通过配置 `colorFormat` 切换成 `rgb格式`
   * @description.en-US color value,By default, `HEX` format is used. You can switch to 'tGB' format by setting `colorFormat`
   */
  value?: string;
  /**
   * @description.zh-CN 颜色改变时触发的回调函数
   * @description.en-US The callback function trigger when the color changes
   */
  onChange?: (value: string) => void;
  /**
   * @description.zh-CN 颜色值格式，默认 'HEX' 格式
   * @description.en-US color format, use `HEX` as default
   * @default HEX
   */
  colorFormat?: 'HEX' | 'RGB';
  /**
   * @description.zh-CN 是否显示透明度模块
   * @description.en-US hether to show the transparency module
   * @default false
   */
  showOpacity?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const defaultProps = {
  value: '#13c2c2',
  colorFormat: 'HEX',
};

export type MergedColorPickerProps = typeof defaultProps & ColorPickerProps;

const basicColors = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000000',
  '#4a4a4a',
  '#9b9b9b',
  '#ffffff',
];

const WIDTH = 200;
const HEIGHT = 150;

const ColorPicker: FC<ColorPickerProps> = p => {
  const props = mergeProps(defaultProps, p);
  const { children, className, value, colorFormat, onChange, showOpacity, ...rest } = props;
  const [selfColor, setSelfColor] = useState(transformColor('hex', value));

  const saturationPosition = useMemo(
    () => ({
      x: (selfColor.hsv.s / 100) * WIDTH,
      y: ((100 - selfColor.hsv.v) / 100) * HEIGHT,
    }),
    [selfColor.hsv.s, selfColor.hsv.v],
  );

  const huePosition = useMemo(
    () => ({
      x: (selfColor.hsv.h / 360) * WIDTH,
    }),
    [selfColor.hsv.h],
  );

  const opacityPosition = useMemo(
    () => ({
      x: (selfColor.hsv.a ?? 1) * WIDTH,
    }),
    [selfColor.hsv.a],
  );

  const rgb = useMemo(() => {
    return `${selfColor.rgb.r}, ${selfColor.rgb.g}, ${selfColor.rgb.b}`;
  }, [selfColor.rgb]);

  const rgba = useMemo(() => {
    return `${rgb}, ${selfColor.rgb.a?.toFixed(3) ?? 1}`;
  }, [rgb, selfColor.rgb]);

  const getValueRGB = useMemo(
    () => ({
      value: `${selfColor.rgb.r}, ${selfColor.rgb.g}, ${selfColor.rgb.b}${
        showOpacity && selfColor.rgb.a !== undefined ? `, ${selfColor.rgb.a?.toFixed(3)}` : ''
      }`,
      inputted: false,
    }),
    [selfColor.rgb, showOpacity],
  );

  const [valueRGB, setValueRGB] = useState(getValueRGB);

  const getValueHEX = useCallback(() => ({ value: selfColor.hex, inputted: false }), [selfColor]);

  const [valueHEX, setValueHEX] = useState(getValueHEX);

  useEffect(() => {
    if (!valueHEX.inputted) {
      setValueHEX(getValueHEX);
    }
  }, [valueHEX.inputted, getValueHEX]);

  useEffect(() => {
    if (!valueRGB.inputted) {
      setValueRGB(getValueRGB);
    }
  }, [valueRGB.inputted, getValueRGB]);

  const changeHEX = (value: string) => {
    if (validHex(value)) {
      setSelfColor(transformColor('hex', value));
      setValueHEX({ ...valueHEX, value: value });
    }
  };

  const changeRGB = (v: string) => {
    const value = v.match(/\d+(?:\.\d+)?/g);

    if (value && (value.length === 3 || (showOpacity && value.length === 4))) {
      const rgb = toRgb(value);

      setSelfColor(transformColor('rgb', rgb));
    }

    setValueRGB({ ...valueRGB, value: v });
  };

  const onSaturationChange = ({ x, y }: Position) => {
    const newHsv = { ...selfColor.hsv, s: (x / WIDTH) * 100, v: 100 - (y / HEIGHT) * 100 };
    const newColor = transformColor('hsv', newHsv);

    setSelfColor(newColor);
  };

  const onHUEChange = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, h: (x / WIDTH) * 360 };
    const newColor = transformColor('hsv', newHsv);

    setSelfColor(newColor);
  };

  const onOpacityChange = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, a: x / WIDTH };
    const newColor = transformColor('hsv', newHsv);

    setSelfColor(newColor);
  };

  useEffect(() => {
    const color = colorFormat === 'RGB' ? `rgb${showOpacity ? 'a' : ''}(${valueRGB.value})` : selfColor.hex;

    onChange?.(color);
  }, [selfColor, valueRGB.value, colorFormat, showOpacity]);

  useEffect(() => {
    if (value === undefined) return;
    setSelfColor(transformColor('hex', value));
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger>{children || <Button backgroundColor={selfColor.hex} />}</PopoverTrigger>
      <PopoverContent width="fit-content" padding={4}>
        <div className={clsx('ultra-color-picker', className)} {...rest} css={colorPickerStyles}>
          <div className="ultra-color-picker__basic_color">
            {basicColors.map(color => (
              <div
                className="ultra-color-picker__basic_color-item"
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setSelfColor(transformColor('hex', color))}
              ></div>
            ))}
          </div>

          <MoveContainer
            onChange={onSaturationChange}
            className="ultra-color-picker_saturation"
            style={{ backgroundColor: `hsl(${transformColor('hsv', selfColor.hsv).hsv.h}, 100%, 50%)` }}
          >
            <div
              className="ultra-color-picker_saturation_cursor"
              style={{ left: saturationPosition.x, top: saturationPosition.y, backgroundColor: selfColor.hex }}
            ></div>
          </MoveContainer>
          <MoveContainer onChange={onHUEChange} className="ultra-color-picker_hue">
            <div
              className="ultra-color-picker_hue_cursor"
              style={{
                left: huePosition.x,
                backgroundColor: `hsl(${transformColor('hsv', selfColor.hsv).hsv.h}, 100%, 50%)`,
              }}
            ></div>
          </MoveContainer>
          {showOpacity && (
            <MoveContainer
              onChange={onOpacityChange}
              className="ultra-color-picker_opacity"
              style={{
                background: `linear-gradient(to right, rgba(${rgb}, 0), rgba(${rgb}, 1)) top left / auto auto,
              conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) top left / 12px 12px
              repeat`,
              }}
            >
              <div
                className="ultra-color-picker_opacity_cursor"
                style={{
                  left: opacityPosition.x,
                  background: `linear-gradient(to right, rgba(${rgba}), rgba(${rgba})) top left / auto auto,
                conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) ${
                  -opacityPosition - 2
                }px 2px / 12px 12px
                repeat`,
                }}
              />
            </MoveContainer>
          )}
          <div className="ultra-color-picker_input">
            <Input
              mt={2}
              value={valueHEX.value}
              onChange={e => changeHEX(e.target.value)}
              onFocus={() => setValueHEX({ ...valueHEX, inputted: true })}
              onBlur={() => setValueHEX({ ...valueHEX, inputted: false })}
            />
            <Input
              mt={2}
              value={valueRGB.value}
              onChange={e => changeRGB(e.target.value)}
              onFocus={() => setValueRGB({ ...valueRGB, inputted: true })}
              onBlur={() => setValueRGB({ ...valueRGB, inputted: false })}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
