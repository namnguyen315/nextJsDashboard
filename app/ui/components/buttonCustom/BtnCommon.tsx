import React from 'react';
import { Button } from '@/components/ui/button';

export default function BtnCommon({
  width,
  height,
  bgColor,
  textColor,
  hoverColor,
  icon,
  iconColor,
  iconSize,
  text,
}: {
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  icon?: any;
  iconColor?: string;
  iconSize?: string;
  text: string;
}) {
  const styleBtn = `${
    width?.includes('px') || width?.includes('%')
      ? `w-[${width}]`
      : `w-${width}`
  } ${
    height?.includes('px') || height?.includes('%')
      ? `h-[${height}]`
      : `h-${height}`
  } ${
    bgColor
      ? bgColor.startsWith('#')
        ? `bg-[${bgColor}]`
        : `bg-${bgColor}`
      : 'bg-slate-600'
  } ${
    hoverColor
      ? hoverColor.startsWith('#')
        ? `hover:bg-[${bgColor}]`
        : `hover:bg-${bgColor}`
      : 'hover:bg-slate-400'
  } px-[5px] py-0`;
  const styleIcon = `${
    iconSize
      ? iconSize.includes('px') || iconSize.includes('%')
        ? `w-[${iconSize}]`
        : `w-${iconSize}`
      : 'w-[30px]'
  } ${
    iconColor
      ? iconColor.startsWith('#')
        ? `text-[${iconColor}]`
        : `text-${iconColor}`
      : 'text-slate-600'
  }`;
  const styleText = `w-[calc(100%_-_${
    iconSize ? iconSize : '35px'
  })] font-bold ${
    textColor
      ? textColor.includes('#')
        ? `text-[${textColor}]`
        : `text-${textColor}`
      : 'text-slate-200'
  }`;
  return (
    <Button variant="outline" className={styleBtn}>
      <div className={styleIcon}>{icon}</div>
      <p className={styleText}>{text ? text : 'button'}</p>
    </Button>
  );
}
